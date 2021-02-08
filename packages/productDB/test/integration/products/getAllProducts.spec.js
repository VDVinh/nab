process.env.GRPC_SERVER_PORT = '44044';

const { expect } = require('chai');
const pick = require('../../../utilities/pick');
const makeClient = require('../../frameworks/grpc/grpcClient');
const { Product } = require('../../../frameworks/sequelize/models');
const fakeProductsList = require('../../../frameworks/faker/fakeProductsList');
const stopServer = require('../../../index');

const serverURI = 'localhost:44044';

const client = makeClient({ serverURI });
let products;
describe('Product Service: GetAll', () => {
  before(async () => {
    products = fakeProductsList(2);
    await Product.bulkCreate(products);
  });
  after(() => {
    Product.destroy({ truncate: true });
    stopServer();
  });
  it('can receive products in db using page and perPage', (done) => {
    const getProducts = client.getAll({ page: 1, perPage: 1 });
    const data = [];
    getProducts.on('data', (product) => data.push(product));
    getProducts.on('end', () => {
      try {
        const checkingAttributes = ['id', 'name', 'price', 'branch'];
        expect(data.length).to.equal(1);
        expect(pick(data, checkingAttributes)).to.deep.equal(
          pick(products, checkingAttributes)
        );
        done();
      } catch (e) {
        done(e);
      }
    });
  });
});
