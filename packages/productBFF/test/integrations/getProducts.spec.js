const { expect } = require('chai');
const request = require('supertest');
const { initServer } = require('../../frameworks/express/routes');
const redisClient = require('../../frameworks/redis');
const {
  makeMockProductsServer,
  mockGetAllResponse
} = require('../frameworks/grpc/grpcProductsMockServer');

const serverURI = '0.0.0.0:50051';

const mockServer = makeMockProductsServer();
const app = initServer();

describe('GET /products', () => {
  before((done) => {
    mockServer.listen(serverURI);
    done();
  });
  after(() => mockServer.close(true));

  it('responds in json', (done) => {
    request(app)
      .get('/products')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect((res) => expect(res.body).to.deep.equal(mockGetAllResponse({})))
      .expect(200, done);
  });

  it('response 404 if route is not found', (done) => {
    request(app)
      .get('/products/not-existed')
      .set('Accept', 'application/json')
      .expect(404, done);
  });

  it('should log the activity', async () => {
    const lengthBefore = await redisClient.getLength();
    await request(app).get('/products').set('Accept', 'application/json');
    const lengthAfter = await redisClient.getLength();
    expect(lengthAfter).to.be.equal(lengthBefore + 1);
  });

  it('should accept pagination', (done) => {
    request(app)
      .get('/products?page=1&perPage=2')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect((res) =>
        expect(res.body).to.deep.equal(
          mockGetAllResponse({ page: 1, perPage: 2 })
        )
      )
      .expect(200, done);
  });
});
