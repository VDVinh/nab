const { promisify } = require('util');
const redis = require('redis');

const makeRedisClient = (configs = {}) => {
  const { CONSUMER_GROUP_NAME, CONSUMER_NAME, PRODUCT_STREAM } = configs;
  const client = redis.createClient(configs);
  client.on('error', (error) => console.error(error));
  const promisifyClient = (name) => promisify(client[name]).bind(client);

  const [xreadgroup, xgroup, xack] = ['xreadgroup', 'xgroup', 'xack'].map(
    promisifyClient
  );
  const ackEntry = (entryId) =>
    xack([PRODUCT_STREAM, CONSUMER_GROUP_NAME, entryId]);

  const createGroupForProductStream = async () => {
    try {
      await xgroup([
        'CREATE',
        PRODUCT_STREAM,
        CONSUMER_GROUP_NAME,
        0,
        'MKSTREAM'
      ]);
    } catch (e) {}
  };

  const readFromPendingInfo = [
    'GROUP',
    CONSUMER_GROUP_NAME,
    CONSUMER_NAME,
    'STREAMS',
    PRODUCT_STREAM,
    0
  ];

  const readInfo = (count) => [
    'GROUP',
    CONSUMER_GROUP_NAME,
    CONSUMER_NAME,
    'COUNT',
    count,
    'STREAMS',
    PRODUCT_STREAM,
    '>'
  ];

  const readFromPending = () => xreadgroup(readFromPendingInfo);
  const readNewEntries = ({ count }) => xreadgroup(readInfo(count));
  return {
    createGroupForProductStream,
    ackEntry,
    readFromPending,
    readNewEntries
  };
};
module.exports = makeRedisClient;
