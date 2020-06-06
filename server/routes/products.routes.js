const express = require('express');
const router = express.Router();

const productController = require('../controller/products.controller');

router.get('/products', productController.list);
router.post('/products', productController.insert);

//Don't put this below router after router.get('/products/:productId')
router.get('/products/aggregate', productController.getNoOfProductsInRole);

router.get('/products/:productId', productController.getById);
router.patch('/products/:productId', productController.patchById);
router.delete('/products/:productId', productController.removeById);

module.exports = router;