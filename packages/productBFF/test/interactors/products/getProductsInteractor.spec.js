const { expect } = require('chai');
const makeGetProducts = require('../../../interactors/products/getProductsInteractor');

const getProductsRepository = () => [];

const getProducts = makeGetProducts({ getProductsRepository });

describe('getProduct Interactor', () => {
  it('can wire up', async () => {
    const products = await getProducts();
    expect(products).to.deep.equal([]);
  });
});
