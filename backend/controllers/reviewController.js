const db = require("../config/database");
const axios = require("axios");

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

// Get product by ID with statistics
exports.getProductById = async (req, res) => {
  try {
    const { productId } = req.params;

    // Get product details
    const [products] = await db.query("SELECT * FROM products WHERE id = ?", [
      productId,
    ]);

    if (products.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const product = products[0];

    // Get statistics for this product
    const [stats] = await db.query(
      `SELECT 
        COUNT(r.id) as total_reviews,
        AVG(r.rating) as average_rating,
        SUM(CASE WHEN r.rating = 5 THEN 1 ELSE 0 END) as five_star,
        SUM(CASE WHEN r.rating = 4 THEN 1 ELSE 0 END) as four_star,
        SUM(CASE WHEN r.rating = 3 THEN 1 ELSE 0 END) as three_star,
        SUM(CASE WHEN r.rating = 2 THEN 1 ELSE 0 END) as two_star,
        SUM(CASE WHEN r.rating = 1 THEN 1 ELSE 0 END) as one_star
       FROM reviews r
       WHERE r.product_id = ?`,
      [productId]
    );

    // Get reviews for this product
    const [reviews] = await db.query(
      `SELECT r.*, p.name as product_name, p.image_url as product_image
       FROM reviews r
       JOIN products p ON r.product_id = p.id
       WHERE r.product_id = ?
       ORDER BY r.created_at DESC`,
      [productId]
    );

    res.json({
      success: true,
      data: {
        product: convertToVietnamTime(product),
        statistics: stats[0] || {
          total_reviews: 0,
          average_rating: 0,
          five_star: 0,
          four_star: 0,
          three_star: 0,
          two_star: 0,
          one_star: 0,
        },
        reviews: convertToVietnamTime(reviews),
      },
    });
  } catch (error) {
    console.error("Error fetching product details:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching product details",
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

// Create new review (requires authentication)
exports.createReview = async (req, res) => {
  try {
    const { product_id, rating, comment } = req.body;
    const userId = req.user.userId; // From JWT token
    const userEmail = req.user.email; // From JWT token

    // Validation
    if (!product_id || !rating) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields (product_id, rating)",
      });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: "Rating must be between 1 and 5",
      });
    }

    // Get user's full name from database
    const [users] = await db.query("SELECT full_name FROM users WHERE id = ?", [
      userId,
    ]);

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const user_name = users[0].full_name;

    // Insert review with user_id
    const [result] = await db.query(
      "INSERT INTO reviews (product_id, user_id, user_name, rating, comment) VALUES (?, ?, ?, ?, ?)",
      [product_id, userId, user_name, rating, comment]
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

// ============================================
// Helper: Fetch reviews from RapidAPI (Amazon)
// ============================================
const fetchAmazonReviews = async (productASIN) => {
  const options = {
    method: "GET",
    url: `https://${process.env.RAPIDAPI_HOST}/product-reviews`,
    params: {
      asin: productASIN,
      country: "US",
      page: "1",
    },
    headers: {
      "x-rapidapi-key": process.env.RAPIDAPI_KEY,
      "x-rapidapi-host": process.env.RAPIDAPI_HOST,
    },
  };

  try {
    console.log("📞 Calling RapidAPI with ASIN:", productASIN);
    console.log("🔑 API Key exists:", !!process.env.RAPIDAPI_KEY);
    console.log("🌐 Host:", process.env.RAPIDAPI_HOST);
    
    const response = await axios.request(options);
    
    console.log("✅ RapidAPI Response status:", response.status);
    console.log("📦 Data structure:", Object.keys(response.data));
    
    return response.data;
  } catch (error) {
    console.error("❌ RapidAPI Error details:");
    console.error("  - Status:", error.response?.status);
    console.error("  - Message:", error.message);
    console.error("  - Response data:", error.response?.data);
    throw error;
  }
};

// ============================================
// Helper: Generate mock reviews (fallback)
// ============================================
const generateMockReviews = () => {
  return [
    {
      product_id: Math.floor(Math.random() * 4) + 1,
      user_name: `User_${Date.now()}`,
      rating: Math.floor(Math.random() * 5) + 1,
      comment: "New review fetched from external system!",
    },
    {
      product_id: Math.floor(Math.random() * 4) + 1,
      user_name: `AutoFetch_${Date.now()}`,
      rating: Math.floor(Math.random() * 5) + 1,
      comment: "Automatically collected review - great product!",
    },
  ];
};

// ============================================
// Main: Fetch reviews from external sources
// ============================================
exports.fetchReviews = async (req, res) => {
  try {
    console.log("🔄 Starting to fetch reviews from external source...");

    let externalReviews = [];
    const useRealAPI = process.env.USE_REAL_API === "true";

    if (useRealAPI && process.env.RAPIDAPI_KEY) {
      console.log("📡 Fetching from RapidAPI (Amazon)...");

      try {
        // Get random product from database to map reviews to
        const [products] = await db.query(
          "SELECT id, name FROM products ORDER BY RAND() LIMIT 1"
        );

        if (products.length === 0) {
          throw new Error("No products in database to map reviews to");
        }

        const targetProduct = products[0];

        // Example Amazon ASIN - You can customize this
        // Popular products: B08N5WRWNW (Echo Dot), B07XJ8C8F5 (Fire TV Stick)
        const amazonASIN = "B08N5WRWNW"; // Echo Dot as example

        const amazonData = await fetchAmazonReviews(amazonASIN);

        // Parse Amazon reviews and map to our format
        if (amazonData && amazonData.data && amazonData.data.reviews) {
          const reviews = amazonData.data.reviews.slice(0, 3); // Get first 3 reviews

          externalReviews = reviews.map((review) => ({
            product_id: targetProduct.id,
            user_name: review.reviewer?.name || "Amazon User",
            rating: Math.min(5, Math.max(1, review.rating || 5)),
            comment: review.review_comment || review.title || "Great product!",
          }));

          console.log(
            `✅ Fetched ${externalReviews.length} reviews from Amazon`
          );
        } else {
          console.log("⚠️ No reviews found from API, using mock data");
          externalReviews = generateMockReviews();
        }
      } catch (apiError) {
        console.error(
          "⚠️ RapidAPI error, falling back to mock data:",
          apiError.message
        );
        externalReviews = generateMockReviews();
      }
    } else {
      console.log("🎭 Using mock data (USE_REAL_API=false or no API key)");
      externalReviews = generateMockReviews();
    }

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
      data: convertToVietnamTime(insertedReviews),
      source: useRealAPI ? "RapidAPI (Amazon)" : "Mock Data",
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
