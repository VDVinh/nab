const makeLogActivityInteractor = require('./logActivityInteractor');
const { logActivityRepository } = require('../../repositories/activities');
const { getProductsActivity } = require('../../entities/activities/products');

const activity = getProductsActivity();
const logGetProductsActivity = makeLogActivityInteractor(activity)({
  logActivityRepository
});

module.exports = { logGetProductsActivity };
