const { promisify } = require('util');
const redis = require('redis');

const makeRedisClient = (configs = {}) => {
  const { productStream } = configs;
  const client = redis.createClient(configs);
  client.on('error', (error) => console.error(error));
  const xadd = promisify(client.xadd).bind(client);
  const xlen = promisify(client.xlen).bind(client);
  const addActivity = async (data) => {
    const nonEmptyValue = Object.entries(data)
      .map(([key, value]) => {
        if (value) return [key, value];
        return [];
      })
      .flat();
    const entryId = await xadd(...[productStream, '*', ...nonEmptyValue]);
    return entryId;
  };
  const getLength = () => xlen(productStream);

  return {
    addActivity,
    getLength
  };
};
module.exports = makeRedisClient;
