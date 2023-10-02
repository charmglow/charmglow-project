const mongoose = require('mongoose');

// Define the product schema
const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: [2, 'Title must be at least 2 characters long.'],
    maxlength: [100, 'Title cannot exceed 100 characters.'],
  },
  price: {
    type: Number,
    required: true,
    min: [0, 'Price cannot be negative.'],
  },
  category: {
    type: String,
    required: true,
  },
  description: String, // Description is optional in this example
  productImage: {
    type: String,
    required: true,
  },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
