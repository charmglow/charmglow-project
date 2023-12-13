const express = require('express');
const {
  getOrders,
  getLatestThreeDaysOrders,
  statusCountController,
} = require('../../controllers/admin/OrderController');
const {
  authenticateAdminToken,
} = require('../../middlewares/admin/authAdminMiddleware');

const router = express.Router();
//test
router.get('/admin/getordersbyadmin', authenticateAdminToken, getOrders);
router.get(
  '/admin/get-threedays-orders',
  authenticateAdminToken,
  getLatestThreeDaysOrders,
);
router.get('/admin/getordersbyadmin', authenticateAdminToken, getOrders);
router.get(
  '/admin/status-count',
  authenticateAdminToken,
  statusCountController,
);

module.exports = router;
