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
    const { page = 1, limit = 10, category, minPrice, maxPrice } = req.query;

    // Define the initial aggregation pipeline
    const pipeline = [];

    // Match stage for category and price filters
    const matchStage = {
      $match: {
        category: category || { $exists: true }, // Add category filter
        price: {
          $gte: minPrice ? parseFloat(minPrice) : 0, // Add minPrice filter
          $lte: maxPrice ? parseFloat(maxPrice) : Number.MAX_VALUE, // Add maxPrice filter
        },
      },
    };

    pipeline.push(matchStage);

    // Pagination: skip and limit stages
    const skipStage = {
      $skip: (page - 1) * parseInt(limit),
    };
    const limitStage = {
      $limit: parseInt(limit),
    };

    pipeline.push(skipStage, limitStage);

    // Add the final aggregation stage to count the total matching documents
    const countStage = {
      $count: 'totalProducts',
    };

    pipeline.push(countStage);

    // Execute the aggregation pipeline
    const aggregationResult = await Product.aggregate(pipeline);

    // Handle the case when the aggregation result is empty
    if (aggregationResult.length === 0) {
      return res.json({
        message: 'No products found',
        products: [],
        currentPage: page,
        totalPages: 0,
        totalProducts: 0,
      });
    }

    // Extract the products and totalProducts count from the aggregation result
    const [products, totalProductsCount] = aggregationResult;

    // Return the products and pagination details
    return res.json({
      message: 'Products found',
      products,
      currentPage: page,
      totalPages: Math.ceil(totalProductsCount.totalProducts / limit),
      totalProducts: totalProductsCount.totalProducts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { getLatestProducts, getProductsByFilter };
