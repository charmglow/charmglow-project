const express = require('express');
const {
  loginAdmin,
  signupAdmin,
} = require('../../controllers/admin/AuthAdminController');

const router = express.Router();

router.post('/admin/login', loginAdmin);
router.post('/admin/signup', signupAdmin);
module.exports = router;
