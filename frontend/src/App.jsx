import { useState, useEffect } from "react";
import "./App.css";
import api from "./services/api";
import ReviewList from "./components/ReviewList";
import Statistics from "./components/Statistics";
import AddReview from "./components/AddReview";
import ProductList from "./components/ProductList";

function App() {
  const [reviews, setReviews] = useState([]);
  const [products, setProducts] = useState([]);
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fetchMessage, setFetchMessage] = useState("");

  // Load dữ liệu ban đầu
  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [reviewsData, productsData, statsData] = await Promise.all([
        api.getAllReviews(),
        api.getAllProducts(),
        api.getStatistics(),
      ]);

      setReviews(reviewsData);
      setProducts(productsData);
      setStatistics(statsData);
    } catch (err) {
      setError("Unable to load data: " + err.message);
      console.error("Error loading data:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch Reviews từ backend (giả lập thu thập từ nguồn bên ngoài)
  const handleFetchReviews = async () => {
    try {
      setLoading(true);
      setError(null);
      setFetchMessage("⏳ Fetching reviews from external system...");

      const result = await api.fetchReviews();

      setFetchMessage(`✅ Successfully fetched new reviews!`);

      // Reload lại dữ liệu
      await loadInitialData();

      // Xóa message sau 3 giây
      setTimeout(() => setFetchMessage(""), 3000);
    } catch (err) {
      setError("Error fetching reviews: " + err.message);
      setFetchMessage("");
      console.error("Error fetching reviews:", err);
    } finally {
      setLoading(false);
    }
  };

  // Thêm review mới
  const handleAddReview = async (reviewData) => {
    try {
      setLoading(true);
      setError(null);

      await api.createReview(reviewData);

      // Reload lại dữ liệu
      await loadInitialData();

      return true;
    } catch (err) {
      setError("Error adding review: " + err.message);
      console.error("Error adding review:", err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>🌟 Product Reviews Management System</h1>
        <p className="subtitle">
          Manage and collect product reviews automatically
        </p>
      </header>

      <main className="app-main">
        {/* Error Message */}
        {error && <div className="alert alert-error">❌ {error}</div>}

        {/* Fetch Message */}
        {fetchMessage && <div className="alert alert-info">{fetchMessage}</div>}

        {/* Fetch Reviews Button */}
        <div className="fetch-section">
          <button
            className="btn btn-primary btn-large"
            onClick={handleFetchReviews}
            disabled={loading}>
            {loading ? "⏳ Processing..." : "🔄 Fetch Reviews"}
          </button>
          <p className="help-text">
            Click to collect new reviews from external systems
          </p>
        </div>

        {/* Statistics */}
        {statistics && <Statistics data={statistics} loading={loading} />}

        {/* Product List */}
        <ProductList products={products} loading={loading} />

        {/* Add Review Form */}
        <AddReview
          products={products}
          onAddReview={handleAddReview}
          loading={loading}
        />

        {/* Review List */}
        <ReviewList reviews={reviews} loading={loading} />
      </main>

      <footer className="app-footer">
        <p>© 2025 Product Reviews System - Powered by React & Express</p>
      </footer>
    </div>
  );
}

export default App;
