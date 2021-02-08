const { expect } = require('chai');
const fakeProductsList = require('../../../../frameworks/faker/fakeProductsList');
const { Product } = require('../../../../frameworks/sequelize/models');

describe('sequelize Product model', () => {
  beforeEach(() => Product.bulkCreate(fakeProductsList(2)));
  afterEach(() => Product.destroy({ truncate: true }));

  it('can load products from MySql', async () => {
    const products = await Product.findAll();
    expect(products.length).to.equal(2);
  });
});
