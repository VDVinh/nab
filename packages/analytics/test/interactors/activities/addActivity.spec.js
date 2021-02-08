const sinon = require('sinon');
const { expect } = require('chai');
const fakeActivity = require('../../frameworks/faker/fakeActivity');
const makeAddActivity = require('../../../interactors/activities/addActivity');

const addActivityRepository = sinon.spy();
const addActivity = makeAddActivity({ addActivityRepository });
describe('addActivity interactor', () => {
  it('should use repository', () => {
    const activity = fakeActivity();
    addActivity(activity);
    expect(addActivityRepository.called).to.equal(true);
  });
});
