const { expect } = require('chai');
const {
  makeMockProductsServer,
  mockGetAllResponse,
  insertingProduct
} = require('./grpcProductsMockServer');
const makeClient = require('../../../frameworks/grpc/grpcClient');

const serverURI = '0.0.0.0:50051';
const mockProductsServer = makeMockProductsServer();

describe('grpcClient', () => {
  let client;
  before((done) => {
    mockProductsServer.listen(serverURI);
    client = makeClient({ serverURI });
    done();
  });

  afterEach(() => {
    mockProductsServer.clearInteractions();
  });

  after(() => {
    mockProductsServer.close(true);
  });

  it('can receive stream data from the server', (done) => {
    const pagination = { page: 1, perPage: 10 };
    const call = client.getAll(pagination);
    const products = [];
    call.on('data', (product) => products.push(product));
    call.on('end', () => {
      expect(products).to.deep.equal(mockGetAllResponse(pagination));
      done();
    });
  });

  it('can get a product', (done) => {
    client.get({ id: 'id1' }, (err, product) => {
      if (err) throw err;
      expect(product.id).to.equal('id1');
      done();
    });
  });

  it('can insert a product', (done) => {
    client.insert(insertingProduct, (err, product) => {
      if (err) throw err;
      expect(product.id).to.equal(insertingProduct.id);
      done();
    });
  });
});
