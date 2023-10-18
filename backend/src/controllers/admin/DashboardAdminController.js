const User = require('../../models/User');
const Product = require('../../models/Admin');

async function fetchDashboardAnalytics(req, res) {
  try {
    const customerCount = await User.countDocuments();
    const productCount = await Product.countDocuments();
    res.status(200).json({
      msgStatus: 'Dashboard analytics retrieved successfully',
      analytics: {
        customerCount,
        productCount,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msgStatus: 'Server error' });
  }
}
async function fetchCustomers(rq, res, next) {
  try {
    const customers = await User.find().select('-password');
    if (customers.length == 0) {
      res.status(404).json({
        msgStatus: 'No customer found',
        users: customers,
      });
    }
    res.status(200).json({
      msgStatus: 'Customers retrieve successfully',
      users: customers,
    });
  } catch (error) {
    res.status(500).json({ msgStatus: 'Error while fetching customers' });
  }
}
module.exports = { fetchDashboardAnalytics, fetchCustomers };
