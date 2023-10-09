const express = require('express');
const {
  login,
  signup,
  nonAdminUsers,
} = require('../controllers/AuthController');
const { authenticateToken } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/login', login);
router.post('/signup', signup);
router.get('/customers', authenticateToken, nonAdminUsers);
module.exports = router;
