const express = require('express');
const { login, signup } = require('../../controllers/user/AuthUserController');
const router = express.Router();

router.post('/user/login', login);
router.post('/user/signup', signup);
module.exports = router;
