const express = require('express');
const {
  authenticateUserToken,
} = require('../../middlewares/user/authUserMiddleware');
const {
  getOrdersByCustomer,
  updateOrderStatus,
} = require('../../controllers/order/orderController');

const router = express.Router();

router.get('/user-orders', authenticateUserToken, getOrdersByCustomer);
router.post('/admin/update-status', authenticateUserToken, updateOrderStatus);

module.exports = router;
