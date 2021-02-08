const { expect } = require('chai');
const sinon = require('sinon');
const fakeActivity = require('../../frameworks/faker/fakeActivity');

const makeAddActivityController = require('../../../controllers/activities/addActivityController');

const addActivityInteractor = sinon.spy();

const addActivityController = makeAddActivityController({
  addActivityInteractor
});

describe('add Activity Controller', () => {
  it('should use interactor', async () => {
    await addActivityController(fakeActivity);
    expect(addActivityInteractor.calledWith(fakeActivity)).to.equal(true);
  });
});
