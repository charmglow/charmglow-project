const express = require('express');
const {
  fetchCustomers,
  fetchDashboardAnalytics,
} = require('../../controllers/admin/DashboardAdminController');
const {
  authenticateAdminToken,
} = require('../../middlewares/admin/authAdminMiddleware');
const router = express.Router();

router.get('/admin/customers', authenticateAdminToken, fetchCustomers);
router.get('/admin/analytics', authenticateAdminToken, fetchDashboardAnalytics);
module.exports = router;
