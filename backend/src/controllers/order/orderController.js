const Order = require('../../models/Order');
const getOrdersByCustomer = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.userId });
    res.status(200).json({
      message: 'User order',
      orders,
    }); // Respond with the retrieved latest products
  } catch (error) {
    console.error('Error in getLatestProducts controller:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { getOrdersByCustomer };
