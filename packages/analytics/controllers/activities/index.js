const makeAddActivityController = require('./addActivityController');

const { addActivityInteractor } = require('../../interactors/activities');

const addActivityController = makeAddActivityController({
  addActivityInteractor
});
module.exports = { addActivityController };
