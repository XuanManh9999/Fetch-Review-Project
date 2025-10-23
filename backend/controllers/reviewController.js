const db = require("../config/database");

// Helper function: Convert UTC to Vietnam timezone (+7 hours)
// Quick fix for demo - cộng 7 giờ cho tất cả timestamps
const convertToVietnamTime = (data) => {
  if (!data) return data;

  // If array, convert each item
  if (Array.isArray(data)) {
    return data.map((item) => convertToVietnamTime(item));
  }

  // If object, convert timestamp fields
  if (typeof data === "object") {
    const converted = { ...data };

    // Convert created_at
    if (converted.created_at) {
      const date = new Date(converted.created_at);
      date.setHours(date.getHours() + 7); // Cộng 7 giờ
      converted.created_at = date.toISOString();
    }

    // Convert updated_at
    if (converted.updated_at) {
      const date = new Date(converted.updated_at);
      date.setHours(date.getHours() + 7); // Cộng 7 giờ
      converted.updated_at = date.toISOString();
    }

    return converted;
  }

  return data;
};

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const [products] = await db.query(
      "SELECT * FROM products ORDER BY created_at DESC"
    );
    res.json({
      success: true,
      data: convertToVietnamTime(products), // Convert timezone +7
    });
  } catch (error) {
    console.error("Error fetching products list:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching products",
      error: error.message,
    });
  }
};

// Get reviews by product
exports.getReviewsByProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const [reviews] = await db.query(
      `SELECT r.*, p.name as product_name 
       FROM reviews r 
       JOIN products p ON r.product_id = p.id 
       WHERE r.product_id = ? 
       ORDER BY r.created_at DESC`,
      [productId]
    );

    res.json({
      success: true,
      data: convertToVietnamTime(reviews), // Convert timezone +7
    });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching reviews",
      error: error.message,
    });
  }
};

// Get all reviews
exports.getAllReviews = async (req, res) => {
  try {
    const [reviews] = await db.query(
      `SELECT r.*, p.name as product_name, p.image_url as product_image 
       FROM reviews r 
       JOIN products p ON r.product_id = p.id 
       ORDER BY r.created_at DESC`
    );

    res.json({
      success: true,
      data: convertToVietnamTime(reviews), // Convert timezone +7
    });
  } catch (error) {
    console.error("Error fetching all reviews:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching reviews",
      error: error.message,
    });
  }
};

// Create new review
exports.createReview = async (req, res) => {
  try {
    const { product_id, user_name, rating, comment } = req.body;

    // Validation
    if (!product_id || !user_name || !rating) {
      return res.status(400).json({
        success: false,
        message:
          "Please provide all required fields (product_id, user_name, rating)",
      });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: "Rating must be between 1 and 5",
      });
    }

    const [result] = await db.query(
      "INSERT INTO reviews (product_id, user_name, rating, comment) VALUES (?, ?, ?, ?)",
      [product_id, user_name, rating, comment]
    );

    // Get newly created review
    const [newReview] = await db.query(
      `SELECT r.*, p.name as product_name 
       FROM reviews r 
       JOIN products p ON r.product_id = p.id 
       WHERE r.id = ?`,
      [result.insertId]
    );

    res.status(201).json({
      success: true,
      message: "Review created successfully!",
      data: convertToVietnamTime(newReview[0]), // Convert timezone +7
    });
  } catch (error) {
    console.error("Error creating review:", error);
    res.status(500).json({
      success: false,
      message: "Server error while creating review",
      error: error.message,
    });
  }
};

// Get statistics
exports.getStatistics = async (req, res) => {
  try {
    const [stats] = await db.query("SELECT * FROM review_statistics");

    // Calculate overall statistics
    const [totalStats] = await db.query(`
      SELECT 
        COUNT(DISTINCT product_id) as total_products,
        COUNT(*) as total_reviews,
        AVG(rating) as overall_average_rating,
        SUM(CASE WHEN rating = 5 THEN 1 ELSE 0 END) as total_five_star,
        SUM(CASE WHEN rating = 4 THEN 1 ELSE 0 END) as total_four_star,
        SUM(CASE WHEN rating = 3 THEN 1 ELSE 0 END) as total_three_star,
        SUM(CASE WHEN rating = 2 THEN 1 ELSE 0 END) as total_two_star,
        SUM(CASE WHEN rating = 1 THEN 1 ELSE 0 END) as total_one_star
      FROM reviews
    `);

    res.json({
      success: true,
      data: {
        byProduct: stats,
        overall: totalStats[0],
      },
    });
  } catch (error) {
    console.error("Error fetching statistics:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching statistics",
      error: error.message,
    });
  }
};

// Fetch reviews from external sources (simulated)
exports.fetchReviews = async (req, res) => {
  try {
    console.log("🔄 Starting to fetch reviews from external source...");

    // Simulate fetching from external API
    const externalReviews = [
      {
        product_id: Math.floor(Math.random() * 4) + 1, // Random product 1-4
        user_name: `User_${Date.now()}`,
        rating: Math.floor(Math.random() * 5) + 1, // Random 1-5
        comment: "New review fetched from external system!",
      },
      {
        product_id: Math.floor(Math.random() * 4) + 1,
        user_name: `AutoFetch_${Date.now()}`,
        rating: Math.floor(Math.random() * 5) + 1,
        comment: "Automatically collected review - great product!",
      },
    ];

    // Save to database
    const insertedReviews = [];
    for (const review of externalReviews) {
      const [result] = await db.query(
        "INSERT INTO reviews (product_id, user_name, rating, comment) VALUES (?, ?, ?, ?)",
        [review.product_id, review.user_name, review.rating, review.comment]
      );

      const [newReview] = await db.query(
        `SELECT r.*, p.name as product_name, p.image_url as product_image 
         FROM reviews r 
         JOIN products p ON r.product_id = p.id 
         WHERE r.id = ?`,
        [result.insertId]
      );

      insertedReviews.push(newReview[0]);
    }

    console.log(
      `✅ Successfully fetched and saved ${insertedReviews.length} new reviews`
    );

    res.json({
      success: true,
      message: `Successfully fetched ${insertedReviews.length} new reviews!`,
      data: convertToVietnamTime(insertedReviews), // Convert timezone +7
    });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching reviews",
      error: error.message,
    });
  }
};
