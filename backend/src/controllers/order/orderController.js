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

const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, newStatus } = req.body;

    // Validate input
    if (!orderId || !newStatus) {
      return res
        .status(400)
        .json({ error: 'Order ID and new status are required' });
    }

    // Find the order by ID and update the status
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { delivery_status: newStatus },
      { new: true },
    );

    if (!updatedOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }

    return res.json(updatedOrder);
  } catch (error) {
    console.error('Error updating order status:', error.message);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
module.exports = { getOrdersByCustomer, updateOrderStatus };
