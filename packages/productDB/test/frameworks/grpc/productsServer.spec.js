const { expect } = require('chai');
const makeClient = require('./grpcClient');
const makeServer = require('../../../frameworks/grpc/grpcServer');
const fakeProduct = require('../../../frameworks/faker/fakeProduct');

const FAKE_PRODUCTS = [fakeProduct(), fakeProduct(), fakeProduct()].map(
  (product, idx) => ({
    ...product,
    id: `i${idx}`,
    createdAt: product.createdAt.toISOString(),
    updatedAt: product.updatedAt.toISOString()
  })
);

const getAll = (call) => {
  const { perPage } = call.request;
  FAKE_PRODUCTS.slice(0, perPage).map((product) => call.write(product));
  call.end();
};

const serverURI = 'localhost:44011';
const client = makeClient({ serverURI });
const services = { getAll };
let server;
describe('Product Service', () => {
  before(() => {
    server = makeServer({ services, serverURI });
  });
  after(() => server.tryShutdown(() => console.log('Grpc server shutdown')));
  it('can serve request on getAll', (done) => {
    const getProducts = client.getAll({ page: 1, perPage: 2 });
    const data = [];
    getProducts.on('data', (product) => data.push(product));
    getProducts.on('end', () => {
      expect(data).to.deep.equal(FAKE_PRODUCTS.slice(0, 2));
      done();
    });
  });
});
