const { expect } = require('chai');

const fakeProduct = require('../../../frameworks/faker/fakeProduct');
const makeProduct = require('../../../entities/product');

describe('faker framework: fakeProduct', () => {
  it('can get cached Product', () => {
    const firstProduct = fakeProduct();
    const cachedProduct = fakeProduct();
    expect(firstProduct).to.be.deep.equal(cachedProduct);
  });

  it('can get non-cached Product', () => {
    const firstProduct = fakeProduct({ cached: false });
    const nonCachedProduct = fakeProduct({ cached: false });
    expect(firstProduct).to.be.not.deep.equal(nonCachedProduct);
  });

  it('should generate a valid product', () => {
    const product = fakeProduct();
    expect(() => makeProduct(product)).to.not.throw();

    const nonCachedProduct = fakeProduct({ cached: false });
    expect(() => makeProduct(nonCachedProduct)).to.not.throw();
  });
});
