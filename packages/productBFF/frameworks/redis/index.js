const makeRedisClient = require('./redisClient');
const configs = require('./configs');

const redisClient = makeRedisClient(configs);
module.exports = redisClient;
