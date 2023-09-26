const express = require('express');
const { login, signup } = require('../controllers/AuthController');
const { authenticateToken } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/login', login);
router.post('/signup', signup);
module.exports = router;
