const authUserRoutes = require('./user/authUserRoutes');
const authAdminRoutes = require('./admin/AuthAdminRoutes');
const dashboardAdminRoutes = require('./admin/dashboardAdminRoutes');
const productRoutes = require('./admin/productRoutes');
const homeRoutes = require('./home/homeRoutes');
const stripeRoutes = require('./stripe/stripeRoutes');
const orderRoutes = require('./order/orderRoutes');
const orderAdminRoutes = require('./admin/orderAdminRoutes');
module.exports = {
  authUserRoutes,
  authAdminRoutes,
  productRoutes,
  dashboardAdminRoutes,
  homeRoutes,
  stripeRoutes,
  orderRoutes,
  orderAdminRoutes,
};
