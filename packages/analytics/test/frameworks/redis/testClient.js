const { promisify } = require('util');
const redis = require('redis');

const ANOTHER_CONSUMER_NAME = 'another-consumer';
const makeTestClient = (configs = {}) => {
  const { CONSUMER_GROUP_NAME, CONSUMER_NAME, PRODUCT_STREAM } = configs;
  const client = redis.createClient(configs);
  client.on('error', (error) => console.error(error));
  const xadd = promisify(client.xadd).bind(client);
  const xreadgroup = promisify(client.xreadgroup).bind(client);
  const xpending = promisify(client.xpending).bind(client);
  const xtrim = promisify(client.xtrim).bind(client);
  const xgroup = promisify(client.xgroup).bind(client);
  const trimProductStream = () => xtrim([PRODUCT_STREAM, 'MAXLEN', 0]);
  const getPending = ({ count }) =>
    xpending([
      PRODUCT_STREAM,
      CONSUMER_GROUP_NAME,
      '-',
      '+',
      count,
      CONSUMER_NAME
    ]);

  const addToStream = async (data) => {
    const nonEmptyValue = Object.entries(data)
      .map(([key, value]) => {
        if (value) return [key, value];
        return [];
      })
      .flat();
    const entryId = await xadd(...[PRODUCT_STREAM, '*', ...nonEmptyValue]);
    return entryId;
  };

  const destroyGroupForProductStream = async () => {
    try {
      await xgroup(['DESTROY', PRODUCT_STREAM, CONSUMER_GROUP_NAME]);
    } catch (e) {}
  };

  const readInfoBy = (customer) => (count) => [
    'GROUP',
    CONSUMER_GROUP_NAME,
    customer,
    'COUNT',
    count,
    'STREAMS',
    PRODUCT_STREAM,
    '>'
  ];

  const tryToCreateGroup = async (read) => {
    try {
      return read();
    } catch (e) {
      console.error(e.stack);
      await xgroup(['CREATE', PRODUCT_STREAM, CONSUMER_GROUP_NAME, 0]);
      return read();
    }
  };

  const readNewEntriesByAnotherConsumer = async ({ count }) =>
    tryToCreateGroup(() =>
      xreadgroup(readInfoBy(ANOTHER_CONSUMER_NAME)(count))
    );
  const readNewEntriesByConsumer = ({ count }) =>
    tryToCreateGroup(() => xreadgroup(readInfoBy(CONSUMER_NAME)(count)));
  return {
    addToStream,
    destroyGroupForProductStream,
    trimProductStream,
    readNewEntriesByAnotherConsumer,
    readNewEntriesByConsumer,
    getPending
  };
};

module.exports = makeTestClient;
