const makeAddActivityRepository = require('./addActivityRepository');

const elasticSearchClient = require('../../frameworks/elasticsearch');
const makeRedisClient = require('../../frameworks/redis/redisClient');
const redisConfigs = require('../../frameworks/redis/configs');

const redisClient = makeRedisClient(redisConfigs);

const addActivityRepository = makeAddActivityRepository({
  elasticSearchClient,
  redisClient
});

module.exports = { addActivityRepository };
