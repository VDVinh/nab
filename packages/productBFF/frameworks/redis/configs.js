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
  productStream: process.env.PRODUCT_STREAM || 'testing-stream'
};
