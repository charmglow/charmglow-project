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
  uploadImagesController,
} = require('../../controllers/admin/ProductController');
const {
  imageUploadMiddleware,
} = require('../../middlewares/imageUploadMiddleware');
const upload = require('../../middlewares/uploadImagesMiddleware');

const router = express.Router();
router.post(
  '/admin/products/add',
  authenticateAdminToken,
  imageUploadMiddleware,
  AddProduct,
);
router.get('/admin/products/all', authenticateAdminToken, GetAllProducts);
router.get('/admin/products/search', authenticateAdminToken, SearchProduct);
router.delete('/admin/products/:id', authenticateAdminToken, deleteProductById);
router.put('/admin/products/:id', authenticateAdminToken, updateProductById);
router.post('/admin/products/upload-images', upload, uploadImagesController);
module.exports = router;
