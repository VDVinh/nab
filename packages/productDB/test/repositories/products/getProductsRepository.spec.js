const { expect } = require('chai');

const fakeProductsList = require('../../../frameworks/faker/fakeProductsList');
const { Product } = require('../../../frameworks/sequelize/models');
const { getProductsRepository } = require('../../../repositories/products');

let transaction;
describe('Get Products Repository', () => {
  before(() => Product.bulkCreate(fakeProductsList(5), { transaction }));
  after(() => Product.destroy({ truncate: true }));
  it('has access to db', async () => {
    const products = await getProductsRepository({
      page: 1,
      perPage: 10
    });
    expect(products.length).to.equal(5);
  });
});
