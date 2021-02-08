const { expect } = require('chai');
const getProductsActivity = require('../../../entities/activities/products/getProductsActivity');
const makeLogActivityInteractor = require('../../../interactors/activities/logActivityInteractor');

const logActivityRepository = (activity) => activity;
const activity = getProductsActivity();
const logActivity = makeLogActivityInteractor(activity)({
  logActivityRepository
});
describe('logActivity', () => {
  it('should add entry into the stream', () => {
    const extraInfo = {
      ipAddress: '0.0.0.0',
      userAgent: 'Chrome',
      url: '/abc'
    };
    const response = logActivity(extraInfo);
    expect(response).to.has.property('ipAddress').to.equal(extraInfo.ipAddress);
    expect(response).to.has.property('userAgent').to.equal(extraInfo.userAgent);
    expect(response).to.has.property('action').to.equal(activity.action);
    expect(response).to.has.property('url').to.equal(extraInfo.url);
    expect(response)
      .to.has.property('httpMethod')
      .to.equal(activity.httpMethod);
    expect(response).to.has.property('time');
  });
});
