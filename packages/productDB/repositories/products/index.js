const makeGetProductRepository = require('./getProductsRepository');
const { Product: productDb } = require('../../frameworks/sequelize/models');

const getProductsRepository = makeGetProductRepository({ productDb });

module.exports = { getProductsRepository };
