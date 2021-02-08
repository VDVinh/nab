module.exports = {
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'nab_product_dev',
  host: process.env.DB_HOST || 'localhost',
  dialect: 'mysql'
};
