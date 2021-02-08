const makeGetProductsController = require('./getProductsController');

const { getProductsInteractor } = require('../../interactors/products');

const getProductsController = makeGetProductsController({
  getProductsInteractor
});

module.exports = { getProductsController };
