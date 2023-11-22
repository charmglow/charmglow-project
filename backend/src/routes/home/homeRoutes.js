const express = require('express');
const {
  getLatestProducts,
  getProductsByFilter,
  getProductById,
  getDiscountedProducts,
} = require('../../controllers/home/homeController');
const router = express.Router();

router.get('/products/latest', getLatestProducts);
router.get('/products/discounted', getDiscountedProducts);
router.get('/products/filter', getProductsByFilter);
router.get('/products/:id', getProductById);
module.exports = router;
