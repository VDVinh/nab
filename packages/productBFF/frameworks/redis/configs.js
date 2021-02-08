module.exports = {
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
  productStream: process.env.PRODUCT_STREAM || 'testing-stream'
};
