const Product = require('../../models/Product');

const getLatestProducts = async (req, res) => {
  try {
    const latestProducts = await Product.find({})
      .sort({ createdAt: -1 }) // Sort by createdAt field in descending order (latest first)
      .limit(10); // Limit the number of results, adjust as needed

    res.status(200).json({
      message: 'latest products',
      latestProducts,
    }); // Respond with the retrieved latest products
  } catch (error) {
    console.error('Error in getLatestProducts controller:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getProductsByCategory = async (req, res) => {
  const category = req.params.category; // Extract the category from the request parameters

  try {
    const products = await Product.find({ category }); // Fetch products with the specified category
    res.status(200).json(products); // Respond with the retrieved products
  } catch (error) {
    console.error('Error in getProductsByCategory controller:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { getLatestProducts, getProductsByCategory };
