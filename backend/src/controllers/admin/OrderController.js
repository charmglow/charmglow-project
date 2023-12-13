const Order = require('../../models/Order');
const moment = require('moment');
// Function to calculate order status
async function getOrderStatus() {
  try {
    const [pendingCount, processingCount, shippedCount, deliveredCount] =
      await Promise.all([
        Order.countDocuments({ delivery_status: 'pending' }),
        Order.countDocuments({ delivery_status: 'processing' }),
        Order.countDocuments({ delivery_status: 'shipped' }),
        Order.countDocuments({ delivery_status: 'delivered' }),
      ]);

    return {
      totalPending: pendingCount,
      totalProcessing: processingCount,
      totalShipped: shippedCount,
      totalDelivered: deliveredCount,
    };
  } catch (error) {
    console.error('Error calculating order status:', error);
    throw error;
  }
}

const statusCountController = async (req, res) => {
  try {
    const orderStatus = await getOrderStatus();
    res.json(orderStatus);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getOrders = async (req, res) => {
  try {
    // Parse query parameters or use default values
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const deliveryStatusFilter = req.query.delivery_status || null;

    // Build match stage for the aggregation pipeline based on the delivery_status filter
    const matchStage = {};
    if (deliveryStatusFilter) {
      matchStage.delivery_status = deliveryStatusFilter;
    }

    // Use aggregate pipeline to get paginated orders and total count, optionally filtered by delivery_status
    const result = await Order.aggregate([
      { $match: matchStage },
      { $skip: skip },
      { $limit: limit },
      {
        $group: { _id: null, orders: { $push: '$$ROOT' }, total: { $sum: 1 } },
      },
      { $project: { _id: 0, orders: 1, total: 1 } },
    ]);

    // Extract paginated orders and total count from the result
    const { orders, total } = result[0] || { orders: [], total: 0 };

    // Send the orders and total as a JSON response
    res.json({ orders, total });
  } catch (error) {
    // Handle errors and send an appropriate response
    console.error('Error retrieving orders:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getLatestThreeDaysOrders = async (req, res) => {
  try {
    // Calculate the date 3 days ago from the current date
    const threeDaysAgo = moment().subtract(3, 'days').toDate();

    // Use aggregate pipeline to get orders created in the last 3 days and count the total
    const result = await Order.aggregate([
      { $match: { createdAt: { $gte: threeDaysAgo } } },
      {
        $facet: {
          orders: [{ $sort: { createdAt: -1 } }, { $limit: 10 }],
          total: [{ $count: 'value' }],
        },
      },
      {
        $project: {
          orders: '$orders',
          total: { $arrayElemAt: ['$total.value', 0] },
        },
      },
    ]);

    // Send the latest orders for the last 3 days and the total count as a JSON response
    res.json(result[0]);
  } catch (error) {
    // Handle errors and send an appropriate response
    console.error('Error retrieving latest orders:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { getOrders, getLatestThreeDaysOrders, statusCountController };
