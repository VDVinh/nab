const makeReadFromStream = require('./readFromStream');
const makeRedisClient = require('./redisClient');
const configs = require('./configs');

const redisClient = makeRedisClient(configs);

const readFromRedisStreamTo = makeReadFromStream({ redisClient });

module.exports = { readFromRedisStreamTo };
