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

const getProductsByFilter = async (req, res) => {
  try {
    const { category, minPrice, maxPrice, page = 1, limit = 10 } = req.query;

    // Create a match object for the aggregation pipeline based on provided filters
    const match = {
      $match: {
        category: category || { $exists: true }, // Match category if provided
        price: {
          $gte: minPrice ? parseFloat(minPrice) : 0, // Match minPrice if provided
          $lte: maxPrice ? parseFloat(maxPrice) : Number.MAX_VALUE, // Match maxPrice if provided
        },
      },
    };

    // Calculate the number of documents to skip based on pagination
    const skip = (page - 1) * parseInt(limit);

    // Add pagination stages to the aggregation pipeline
    const skipStage = { $skip: skip };
    const limitStage = { $limit: parseInt(limit) };

    // Execute the aggregation pipeline to get the products and total count
    const aggregationResult = await Product.aggregate([
      match,
      skipStage,
      limitStage,
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          products: { $push: '$$ROOT' },
        },
      },
    ]);

    const totalProducts = aggregationResult[0].products;
    const totalProductsCount = aggregationResult[0].total;

    // Calculate the total number of pages
    const totalPages = Math.ceil(totalProductsCount / limit);

    // Return the products and pagination details
    return res.json({
      products: totalProducts,
      currentPage: page,
      totalPages,
      totalProducts: totalProductsCount,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};
const getProductById = async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
module.exports = { getLatestProducts, getProductsByFilter, getProductById };
