const fs = require('fs');

let password;
if (process.env.DB_PASSWORD_FILE) {
  password = fs
    .readFileSync(process.env.DB_PASSWORD_FILE)
    .toString()
    .trim();
}
module.exports = {
  username: process.env.DB_USERNAME || 'root',
  password,
  database: process.env.DB_NAME || 'nab_product_dev',
  host: process.env.DB_HOST || 'localhost',
  dialect: 'mysql'
};
