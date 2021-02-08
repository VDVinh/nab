const makeAddActivityInteractor = require('./addActivity');
const { addActivityRepository } = require('../../repositories/activities');

const addActivityInteractor = makeAddActivityInteractor({
  addActivityRepository
});

module.exports = { addActivityInteractor };
