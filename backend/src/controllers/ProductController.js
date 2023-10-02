const Product = require('../models/Product');

async function AddProduct(req, res, next) {
  const { title, price, category, description } = req.body;

  // Create a new product instance
  try {
    console.log(req);
    const newProduct = new Product({
      title,
      price,
      category,
      description,
      productImage: req.file.path.replace(/\\/g, '/'), // Save the filename of the uploaded image
    });

    // Save the product to the database
    await newProduct.save();

    res
      .status(201)
      .json({ message: 'Product added successfully', data: newProduct });
  } catch (error) {
    console.error('Error adding product:', error);
    res
      .status(500)
      .json({ error: 'An error occurred while adding the product.' });
  }
}

module.exports = { AddProduct };
