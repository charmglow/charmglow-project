const express = require('express');
const { authenticateToken } = require('../middlewares/authMiddleware');
const {
  AddProduct,
  GetAllProducts,
  SearchProduct,
  deleteProductById,
  updateProductById,
} = require('../controllers/ProductController');
const {
  imageUploadMiddleware,
} = require('../middlewares/imageUploadMiddleware');
const router = express.Router();
router.post(
  '/products/add',
  authenticateToken,
  imageUploadMiddleware,
  AddProduct,
);
router.get('/products/all', authenticateToken, GetAllProducts);
router.get('/products/search', authenticateToken, SearchProduct);
router.delete('/products/:id', authenticateToken, deleteProductById);
router.put('/products/:id', authenticateToken, updateProductById);
module.exports = router;
