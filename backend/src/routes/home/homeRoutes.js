const express = require('express');
const {
  getLatestProducts,
  getProductsByFilter,
  getProductById,
} = require('../../controllers/home/homeController');
const router = express.Router();

router.get('/products/latest', getLatestProducts);
router.get('/products/filter', getProductsByFilter);
router.get('/products/:id', getProductById);
module.exports = router;
