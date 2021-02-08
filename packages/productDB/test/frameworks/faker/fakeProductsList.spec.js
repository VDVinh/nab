const { expect } = require('chai');

const fakeProductsList = require('../../../frameworks/faker/fakeProductsList');
const makeProduct = require('../../../entities/product');

describe('faker framework: fakeProductList', () => {
  it('can generate many different Products', () => {
    const products = fakeProductsList(3);
    expect(products.length).to.equal(3);
    expect(products[0]).to.not.deep.equal(products[1]);
    expect(products[1]).to.not.deep.equal(products[2]);
    expect(products[0]).to.not.deep.equal(products[2]);
  });

  it('can generate valid products', () => {
    const products = fakeProductsList(3);
    const validateProducts = () =>
      products.map((product) => makeProduct(product));
    expect(validateProducts).to.not.throw();
  });
});
