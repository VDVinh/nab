const { expect } = require('chai');
const sinon = require('sinon');

const elasticSearchClient = { addActivity: () => {} };
const addActivity = sinon.spy(elasticSearchClient, 'addActivity');

const redisClient = { ackEntry: () => {} };
const ackEntry = sinon.spy(redisClient, 'ackEntry');

const makeAddActivityRepository = require('../../../repositories/activities/addActivityRepository');

const addActivityRepository = makeAddActivityRepository({
  elasticSearchClient,
  redisClient
});
describe('add Activity Repository', () => {
  it('should add activity to the analytic frameworks', async () => {
    await addActivityRepository({});
    expect(addActivity.calledOnce).to.equal(true);
    expect(ackEntry.calledOnce).to.equal(true);
  });
});
