const { getProductsRepository } = require('../../repositories/products');
const makeGetProductsIterator = require('./getProductsInteractor');

const getProductsInteractor = makeGetProductsIterator({
  getProductsRepository
});

module.exports = { getProductsInteractor };
