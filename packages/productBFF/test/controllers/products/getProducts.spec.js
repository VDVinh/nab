const { expect } = require('chai');
const sinon = require('sinon');
const makeGetProductsController = require('../../../controllers/products/getProductsController');

const FAKE_PRODUCTS = [[], [1, 2, 3], [4, 5, 6], [7, 8, 9]];
const getProducts = ({ page, perPage }) =>
  FAKE_PRODUCTS[page].slice(0, perPage);
const getProductsReturnNull = () => null;
const getProductsWithException = () => {
  throw new Error('failed');
};

let logActivity;
describe('getProducts Controller', () => {
  beforeEach(() => {
    logActivity = sinon.spy();
  });
  it('can send request to Interactor', async () => {
    const getProductsController = makeGetProductsController({
      logActivity
    })({
      getProducts
    });
    const response = await getProductsController({
      query: { page: '1', perPage: '2' }
    });
    expect(logActivity.called).to.equal(true);
    expect(response.statusCode).to.equal(200);
    expect(response.data).to.deep.equal([1, 2]);
  });

  it('can handle exception from Interactor', async () => {
    const getProductsController = makeGetProductsController({
      logActivity
    })({
      getProducts: getProductsWithException
    });
    const response = await getProductsController();
    expect(logActivity.called).to.equal(true);
    expect(response.statusCode).to.equal(400);
    expect(response.error).to.equal('failed');
  });

  it('can return [] when the Interactor return null', async () => {
    const getProductsController = makeGetProductsController({
      logActivity
    })({
      getProducts: getProductsReturnNull
    });
    const response = await getProductsController();
    expect(logActivity.called).to.equal(true);
    expect(response.statusCode).to.equal(200);
    expect(response.data).to.deep.equal([]);
  });
});
