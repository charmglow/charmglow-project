const authUserRoutes = require('./user/authUserRoutes');
const authAdminRoutes = require('./admin/AuthAdminRoutes');
const dashboardAdminRoutes = require('./admin/dashboardAdminRoutes');
const productRoutes = require('./admin/productRoutes');
module.exports = {
  authUserRoutes,
  authAdminRoutes,
  productRoutes,
  dashboardAdminRoutes,
};
