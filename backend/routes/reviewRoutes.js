const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");

// Routes for products
router.get("/products", reviewController.getAllProducts);

// Routes for reviews
router.get("/reviews", reviewController.getAllReviews);
router.get("/reviews/product/:productId", reviewController.getReviewsByProduct);
router.post("/reviews", reviewController.createReview);

// Route for statistics
router.get("/statistics", reviewController.getStatistics);

// Special route: Fetch reviews from external sources
router.post("/fetch-reviews", reviewController.fetchReviews);

module.exports = router;
