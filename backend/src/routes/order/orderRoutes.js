const express = require('express');
const {
  authenticateUserToken,
} = require('../../middlewares/user/authUserMiddleware');
const {
  getOrdersByCustomer,
} = require('../../controllers/order/orderController');

const router = express.Router();

router.get('/user-orders', authenticateUserToken, getOrdersByCustomer);

module.exports = router;
