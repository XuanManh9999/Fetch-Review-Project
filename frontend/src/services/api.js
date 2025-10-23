import axios from "axios";

const API_BASE_URL = "http://localhost:4000/api";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// Interceptor để xử lý response
apiClient.interceptors.response.use(
  (response) => {
    return response.data.data || response.data;
  },
  (error) => {
    console.error("API Error:", error);
    const message =
      error.response?.data?.message ||
      error.message ||
      "Server connection error";
    throw new Error(message);
  }
);

const api = {
  // Products
  getAllProducts: async () => {
    return await apiClient.get("/products");
  },

  // Reviews
  getAllReviews: async () => {
    return await apiClient.get("/reviews");
  },

  getReviewsByProduct: async (productId) => {
    return await apiClient.get(`/reviews/product/${productId}`);
  },

  createReview: async (reviewData) => {
    return await apiClient.post("/reviews", reviewData);
  },

  // Fetch reviews từ nguồn bên ngoài
  fetchReviews: async () => {
    return await apiClient.post("/fetch-reviews");
  },

  // Statistics
  getStatistics: async () => {
    return await apiClient.get("/statistics");
  },
};

export default api;
