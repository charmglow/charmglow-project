const express = require('express');
const { authenticateToken } = require('../middlewares/authMiddleware');
const { AddProduct } = require('../controllers/ProductController');
const {
  imageUploadMiddleware,
} = require('../middlewares/imageUploadMiddleware');
const upload = require('../middlewares/imageUploadMiddleware');
const router = express.Router();
router.post('/products', authenticateToken, imageUploadMiddleware, AddProduct);
module.exports = router;
