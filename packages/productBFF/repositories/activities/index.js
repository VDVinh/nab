const makeLogActivityRepository = require('./logActivityRepository');

const redisClient = require('../../frameworks/redis');

const logActivityRepository = makeLogActivityRepository({ redisClient });

module.exports = { logActivityRepository };
