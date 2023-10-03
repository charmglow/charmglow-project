const { deleteImageFile } = require('../helpers/utils');
const { upload } = require('../middlewares/imageUploadMiddleware');
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
async function GetAllProducts(req, res) {
  try {
    // Fetch all products from the database
    const products = await Product.find();

    res.status(200).json({ products });
  } catch (error) {
    console.error('Error fetching products:', error);
    res
      .status(500)
      .json({ error: 'An error occurred while fetching products.' });
  }
}

async function SearchProduct(req, res) {
  try {
    const { search } = req.query;

    // Use a regular expression to perform a case-insensitive search on title and category
    const regex = new RegExp(search, 'i');

    // Fetch products that match the search query in title or category
    const products = await Product.find({
      $or: [{ title: regex }, { category: regex }],
    });

    res.status(200).json({ products });
  } catch (error) {
    console.error('Error searching products:', error);
    res
      .status(500)
      .json({ error: 'An error occurred while searching for products.' });
  }
}
async function deleteProductById(req, res) {
  try {
    const { id } = req.params;

    // Find the product to get the image file path
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ error: 'Product not found.' });
    }

    // Delete the associated image file
    if (product.productImage) {
      deleteImageFile(product.productImage);
    }

    // Delete the product from the database
    const deletedProduct = await Product.findByIdAndDelete(id);

    res
      .status(200)
      .json({ message: 'Product deleted successfully', data: deletedProduct });
  } catch (error) {
    console.error('Error deleting product:', error);
    res
      .status(500)
      .json({ error: 'An error occurred while deleting the product.' });
  }
}

async function updateProductById(req, res) {
  try {
    const { id } = req.params;
    console.log('====================================');
    console.log('req.body: ', req.body);
    console.log('====================================');
    const { title, price, category, description } = req.body;

    // Check if the product with the specified ID exists
    const existingProduct = await Product.findById(id);

    if (!existingProduct) {
      return res.status(404).json({ error: 'Product not found.' });
    }
    // Update the product fields
    existingProduct.title = title;
    existingProduct.price = price;
    existingProduct.category = category;
    existingProduct.description = description;

    // Check if a new image file is provided
    if (req.file) {
      // Delete the existing image file (if it exists)
      if (existingProduct.productImage) {
        deleteImageFile(existingProduct.productImage);
      }
      // Save the new image file path
      existingProduct.productImage = req.file.path.replace(/\\/g, '/');
    }

    // Save the updated product to the database
    const updatedProduct = await existingProduct.save();

    res
      .status(200)
      .json({ message: 'Product updated successfully', data: updatedProduct });
  } catch (error) {
    console.error('Error updating product:', error);
    res
      .status(500)
      .json({ error: 'An error occurred while updating the product.' });
  }
}

module.exports = {
  AddProduct,
  GetAllProducts,
  SearchProduct,
  deleteProductById,
  updateProductById,
};
