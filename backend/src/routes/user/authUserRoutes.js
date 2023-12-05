const express = require('express');
const {
  login,
  signup,
  updateShippingAddress,
} = require('../../controllers/user/AuthUserController');
const {
  authenticateUserToken,
} = require('../../middlewares/user/authUserMiddleware');
const router = express.Router();

router.post('/user/login', login);
router.post('/user/signup', signup);
router.post(
  '/user/updateaddress',
  authenticateUserToken,
  updateShippingAddress,
);
module.exports = router;
