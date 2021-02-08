const redisConfigs = {
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
  CONSUMER_GROUP_NAME: process.env.CONSUMER_GROUP_NAME || 'consumer-group',
  CONSUMER_NAME: process.env.CONSUMER_NAME || 'consumer',
  PRODUCT_STREAM: process.env.PRODUCT_STREAM || 'testing'
};

module.exports = redisConfigs;
