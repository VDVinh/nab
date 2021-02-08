const express = require('express');

const controllerWrapper = require('../controllerWrapper');
const { getProductsController } = require('../../../../controllers/products');

const router = express.Router();
router.get('/', controllerWrapper(getProductsController));

module.exports = router;
