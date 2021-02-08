const { expect } = require('chai');
const makeGetProductsIterator = require('../../interactors/products/getProductsInteractor');

const getProductsRepository = () => 1;

const getProducts = makeGetProductsIterator({ getProductsRepository });

describe('getProducts Interactor', () => {
  it('has function getAll', async () => {
    expect(await getProducts()).to.equal(1);
  });
});
