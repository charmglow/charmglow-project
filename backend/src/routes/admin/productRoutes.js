const express = require('express');
const {
  authenticateAdminToken,
} = require('../../middlewares/admin/authAdminMiddleware');
const {
  AddProduct,
  GetAllProducts,
  SearchProduct,
  deleteProductById,
  updateProductById,
} = require('../../controllers/admin/ProductController');
const {
  imageUploadMiddleware,
} = require('../../middlewares/imageUploadMiddleware');
const router = express.Router();
router.post(
  '/products/add',
  authenticateAdminToken,
  imageUploadMiddleware,
  AddProduct,
);
router.get('/products/all', authenticateAdminToken, GetAllProducts);
router.get('/products/search', authenticateAdminToken, SearchProduct);
router.delete('/products/:id', authenticateAdminToken, deleteProductById);
router.put('/products/:id', authenticateAdminToken, updateProductById);
module.exports = router;
