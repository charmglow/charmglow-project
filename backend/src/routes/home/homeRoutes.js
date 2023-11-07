const express = require('express');
const {
  getLatestProducts,
  getProductsByFilter,
} = require('../../controllers/home/homeController');
const router = express.Router();

router.get('/products/latest', getLatestProducts);
router.get('/products/filter', getProductsByFilter);
module.exports = router;
