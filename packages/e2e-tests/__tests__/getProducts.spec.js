const { expect } = require('chai');
const request = require('supertest')(process.env.PRODUCT_BFF_URL);
const requestES = require('supertest')(process.env.ELASTIC_SEARCH_URL);

let random;
describe('GET /products', () => {
  before(() => {
    random = Math.random();
  });
  it('should receive list of products', (done) => {
    request
      .get(`/products?${random}`)
      .set('Accept', 'application/json')
      .expect(200)
      .then((response) => {
        expect(response.body.length).to.be.a.number;
        done();
      });
  });

  it('should log the request into elastic search index', async () => {
    await requestES.post('/get-products-list/_refresh').send();
    await requestES
      .get(`/get-products-list/_search?q=url:*${random}`)
      .expect(200)
      .then((response) => {
        const result = response.body.hits.hits;
        expect(result.length).to.equal(1);
        expect(result[0]._source.url).to.equal(`/products?${random}`);
      });
  });

  it('should works with pagination', (done) => {
    request
      .get('/products?page=1&perPage=1')
      .expect(200)
      .then((response) => {
        expect([0, 1].includes(response.body.length)).to.equal(true);
        done();
      });
  });
});
