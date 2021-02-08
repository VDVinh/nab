process.env.CONSUMER_GROUP_NAME = 'consumers-group';
process.env.CONSUMER_NAME = 'consumer';
process.env.PRODUCT_STREAM = 'testing-now';
const INDEX = 'get-products-list';
const { fork } = require('child_process');

const { expect } = require('chai');
const fakeActivity = require('../test/frameworks/faker/fakeActivity');

const makeElasticSearchClient = require('../frameworks/elasticsearch/client');
const redisConfigs = require('../frameworks/redis/configs');
const loadConfigs = require('../frameworks/elasticsearch/configs');

const { removeAllDocuments, searchBy } = makeElasticSearchClient(loadConfigs());
const makeTestClient = require('../test/frameworks/redis/testClient');

const {
  addToStream,
  trimProductStream,
  destroyGroupForProductStream
} = makeTestClient(redisConfigs);

let server;
const runServer = () => {
  server = fork('./index', [], {
    stdio: 'pipe'
  });
};

const stopServer = () => server.kill('SIGINT');

const removeDocumentsIfIndexExisted = () => {
  try {
    removeAllDocuments({ index: INDEX });
  } catch (e) {}
};

describe('test integration', () => {
  const activity = fakeActivity();
  before(runServer);
  beforeEach(removeDocumentsIfIndexExisted);
  after(async () => {
    stopServer();
    await trimProductStream();
    await destroyGroupForProductStream();
  });
  it('can read from redis stream and index into elastic search', async () => {
    const conditions = { match: { ipAddress: activity.ipAddress } };
    const resultBeforeAdd = await searchBy({ conditions });
    await addToStream(activity);
    setImmediate(async () => {
      const resultAfterAdd = await searchBy({ conditions });
      expect(resultAfterAdd.length).to.equal(resultBeforeAdd.length + 1);
    });
  });
});
