const { expect } = require('chai');
const makeLogActivityRepositor = require('../../../repositories/activities/logActivityRepository');

const redisClient = require('../../../frameworks/redis');

const logActivityRepository = makeLogActivityRepositor({ redisClient });

describe('log Activity Repository', () => {
  it('add activity to the activityStorage', async () => {
    const lengthBeforeLog = await redisClient.getLength();
    const data = { a: 1 };
    await logActivityRepository(data);
    const lengthAfterLog = await redisClient.getLength();
    expect(lengthAfterLog).to.equal(lengthBeforeLog + 1);
  });
});
