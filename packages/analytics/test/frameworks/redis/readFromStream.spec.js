const { expect } = require('chai');
const makeTestClient = require('./testClient');
const makeClient = require('../../../frameworks/redis/redisClient');
const redisConfigs = require('../../../frameworks/redis/configs');
const makeReadFromStream = require('../../../frameworks/redis/readFromStream');

const client = makeClient(redisConfigs);
const testClient = makeTestClient(redisConfigs);
const {
  addToStream,
  trimProductStream,
  destroyGroupForProductStream,
  readNewEntriesByAnotherConsumer,
  getPending,
  readNewEntriesByConsumer
} = testClient;

const readFromStream = makeReadFromStream({
  redisClient: client
})({
  controller: client.ackEntry
});

const pushDataToStream = (numberOfItems) =>
  Promise.all(
    [...Array(numberOfItems)].map((_, i) => addToStream({ item: i + 1 }))
  );

const TOTAL_NUMBER_OF_ITEMS = 100;
describe('readFromStream', () => {
  before(trimProductStream);
  beforeEach(async () => {
    await client.createGroupForProductStream();
    await pushDataToStream(TOTAL_NUMBER_OF_ITEMS);
  });
  afterEach(async () => {
    await trimProductStream();
    await destroyGroupForProductStream();
  });

  it('can read data from stream', async () => {
    const READ_COUNT = 10;
    await readFromStream({ count: READ_COUNT });
    const remaining = await readNewEntriesByAnotherConsumer({
      count: TOTAL_NUMBER_OF_ITEMS
    });

    expect(remaining[0][1].length).to.equal(TOTAL_NUMBER_OF_ITEMS - READ_COUNT);
  });

  it('can read pending events from stream', async () => {
    const PENDING_COUNT = 5;
    const READ_COUNT = 20;
    await readNewEntriesByConsumer({ count: PENDING_COUNT });
    await readFromStream({ count: READ_COUNT });
    const remaining = await readNewEntriesByAnotherConsumer({
      count: TOTAL_NUMBER_OF_ITEMS
    });

    expect(remaining[0][1].length).to.equal(
      TOTAL_NUMBER_OF_ITEMS - PENDING_COUNT
    );
  });

  it('should process data from pending stream first', async () => {
    const READ_COUNT = 50;
    await readNewEntriesByConsumer({
      count: READ_COUNT
    });
    const pendingsBeforeProcessing = await getPending({
      count: TOTAL_NUMBER_OF_ITEMS
    });
    await readFromStream({ count: READ_COUNT });
    const getPendingsAfterProcessing = () =>
      getPending({
        count: TOTAL_NUMBER_OF_ITEMS
      });
    expect(pendingsBeforeProcessing.length).to.equal(READ_COUNT);
    setImmediate(async () => {
      const laterPending = await getPendingsAfterProcessing();
      expect(laterPending.length).to.equal(0);
    });
  });
});
