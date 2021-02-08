const makeGetProductsInteractor = require('./getProductsInteractor');
const { getProductsRepository } = require('../../repositories/products');

const getProducts = makeGetProductsInteractor({ getProductsRepository });

module.exports = { getProducts };
