const authUserRoutes = require('./user/authUserRoutes');
const authAdminRoutes = require('./admin/AuthAdminRoutes');
const dashboardAdminRoutes = require('./admin/dashboardAdminRoutes');
const productRoutes = require('./admin/productRoutes');
const homeRoutes = require('./home/homeRoutes');
const stripeRoutes = require('./stripe/stripeRoutes');
module.exports = {
  authUserRoutes,
  authAdminRoutes,
  productRoutes,
  dashboardAdminRoutes,
  homeRoutes,
  stripeRoutes,
};
