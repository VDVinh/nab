const makeGetProductsController = require('./getProductsController');

const { getProducts } = require('../../interactors/products');
const { logGetProductsActivity } = require('../../interactors/activities');

const getProductsController = makeGetProductsController({
  logActivity: logGetProductsActivity
})({
  getProducts
});

module.exports = { getProductsController };
