const express = require('express');
const {
  getLatestProducts,
  getProductsByCategory,
} = require('../../controllers/home/homeController');
const router = express.Router();

router.get('/products/latest', getLatestProducts);
router.get('/products/category/:category', getProductsByCategory);
module.exports = router;
