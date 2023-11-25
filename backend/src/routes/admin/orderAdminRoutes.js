const express = require('express');
const {
  getOrders,
  getLatestThreeDaysOrders,
} = require('../../controllers/admin/OrderController');
const {
  authenticateAdminToken,
} = require('../../middlewares/admin/authAdminMiddleware');

const router = express.Router();

router.get('/admin/getordersbyadmin', authenticateAdminToken, getOrders);
router.get(
  '/admin/get-threedays-orders',
  authenticateAdminToken,
  getLatestThreeDaysOrders,
);

module.exports = router;
