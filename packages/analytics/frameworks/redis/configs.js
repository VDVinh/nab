const fs = require('fs');

let password;
if (process.env.REDIS_PASSWORD_FILE) {
  password = fs
    .readFileSync(process.env.REDIS_PASSWORD_FILE)
    .toString()
    .trim();
}
module.exports = {
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password,
  CONSUMER_GROUP_NAME: process.env.CONSUMER_GROUP_NAME || 'consumer-group',
  CONSUMER_NAME: process.env.CONSUMER_NAME || 'consumer',
  PRODUCT_STREAM: process.env.PRODUCT_STREAM || 'testing'
};
