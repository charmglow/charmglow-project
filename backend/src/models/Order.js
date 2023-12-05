const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      require: true,
    },
    customerId: {
      type: String,
    },
    paymentIntentId: {
      type: String,
    },
    products: [
      {
        _id: {
          type: String,
        },
        quantity: {
          type: Number,
        },
        total: {
          type: Number,
        },
        price: {
          type: Number,
        },
        title: {
          type: String,
        },
        productImage: [String],
      },
    ],
    subtotal: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    shipping: {
      type: Object,
      required: true,
    },
    delivery_status: {
      type: String,
      default: 'pending',
      required: true,
    },
    payment_status: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);
orderSchema.statics.findOrdersByUserId = function (userId) {
  return this.find({ userId });
};
const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
