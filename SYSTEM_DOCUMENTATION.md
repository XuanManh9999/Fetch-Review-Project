# 📚 Hệ Thống Quản Lý Đánh Giá Sản Phẩm

## Product Reviews Management System - Documentation

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Status](https://img.shields.io/badge/status-production-green.svg)
![Tech Stack](https://img.shields.io/badge/stack-React%20%2B%20Express%20%2B%20MySQL-orange.svg)

---

## 📑 Mục Lục

1. [Tổng Quan Hệ Thống](#1-tổng-quan-hệ-thống)
2. [Kiến Trúc Kỹ Thuật](#2-kiến-trúc-kỹ-thuật)
3. [Luồng Hoạt Động Chi Tiết](#3-luồng-hoạt-động-chi-tiết)
4. [Hướng Dẫn Cài Đặt](#4-hướng-dẫn-cài-đặt)
5. [Cấu Trúc Database](#5-cấu-trúc-database)
6. [API Documentation](#6-api-documentation)
7. [Cấu Trúc Dự Án](#7-cấu-trúc-dự-án)
8. [Các Tính Năng Chính](#8-các-tính-năng-chính)
9. [Bảo Mật & Best Practices](#9-bảo-mật--best-practices)
10. [Troubleshooting](#10-troubleshooting)

---

## 1. Tổng Quan Hệ Thống

### 🎯 Mục Đích

Hệ thống **Product Reviews Management System** là một ứng dụng web toàn diện được thiết kế để quản lý và thu thập đánh giá sản phẩm từ nhiều nguồn khác nhau. Ứng dụng giúp doanh nghiệp:

- ✅ **Quản lý danh sách sản phẩm** một cách trực quan
- ✅ **Thu thập đánh giá** từ khách hàng (thủ công hoặc tự động)
- ✅ **Phân tích thống kê** đánh giá theo từng sản phẩm
- ✅ **Hiển thị rating** và feedback một cách chuyên nghiệp
- ✅ **Tích hợp nguồn bên ngoài** để tự động cập nhật review

### 👥 Đối Tượng Sử Dụng

#### Người Dùng Cuối (End Users)

- **Khách hàng**: Thêm đánh giá, xem feedback về sản phẩm
- **Quản trị viên**: Quản lý sản phẩm, theo dõi đánh giá và thống kê

#### Nhà Phát Triển (Developers)

- **Frontend Developers**: Làm việc với React components
- **Backend Developers**: Xây dựng và mở rộng RESTful API
- **Database Administrators**: Quản lý và tối ưu hóa MySQL database

### 🌟 Điểm Nổi Bật

```
┌─────────────────────────────────────────────────────┐
│  🎨 GIAO DIỆN HIỆN ĐẠI                             │
│  ├─ Responsive Design (Desktop/Mobile)              │
│  ├─ Real-time Updates                               │
│  └─ User-friendly Interface                         │
│                                                      │
│  ⚡ HIỆU NĂNG CAO                                   │
│  ├─ Connection Pooling (MySQL)                      │
│  ├─ Async/Await Pattern                             │
│  └─ Optimized Database Queries                      │
│                                                      │
│  🔒 BẢO MẬT                                         │
│  ├─ CORS Configuration                              │
│  ├─ Input Validation                                │
│  └─ SQL Injection Prevention                        │
│                                                      │
│  🔄 TÍCH HỢP DỄ DÀNG                               │
│  ├─ RESTful API Standard                            │
│  ├─ Auto-fetch Reviews from External Sources        │
│  └─ Scalable Architecture                           │
└─────────────────────────────────────────────────────┘
```

---

## 2. Kiến Trúc Kỹ Thuật

### 📐 Kiến Trúc Tổng Quan (3-Tier Architecture)

```
┌──────────────────────────────────────────────────────────────┐
│                    PRESENTATION LAYER                         │
│  ┌────────────────────────────────────────────────────┐      │
│  │           React Frontend (Port 5173)               │      │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐         │      │
│  │  │   App    │  │Components│  │ Services │         │      │
│  │  │  (Main)  │  │  (UI)    │  │  (API)   │         │      │
│  │  └──────────┘  └──────────┘  └──────────┘         │      │
│  │       │              │              │               │      │
│  └───────┼──────────────┼──────────────┼───────────────┘      │
│          │              │              │                       │
│          └──────────────┴──────────────┘                       │
│                         │                                      │
│                    HTTP/REST API                               │
│                         │                                      │
├──────────────────────────┼──────────────────────────────────────┤
│                         ▼                                      │
│                  APPLICATION LAYER                             │
│  ┌────────────────────────────────────────────────────┐      │
│  │        Express.js Backend (Port 4000)              │      │
│  │  ┌───────────┐  ┌───────────┐  ┌──────────┐       │      │
│  │  │  Routes   │  │Controllers│  │ Middleware│       │      │
│  │  │  (API)    │  │ (Logic)   │  │  (CORS)   │       │      │
│  │  └───────────┘  └───────────┘  └──────────┘       │      │
│  │       │              │              │               │      │
│  └───────┼──────────────┼──────────────┼───────────────┘      │
│          │              │              │                       │
│          └──────────────┴──────────────┘                       │
│                         │                                      │
│                    MySQL Driver                                │
│                         │                                      │
├──────────────────────────┼──────────────────────────────────────┤
│                         ▼                                      │
│                    DATA LAYER                                  │
│  ┌────────────────────────────────────────────────────┐      │
│  │            MySQL Database (Port 3306)              │      │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐         │      │
│  │  │ Products │  │ Reviews  │  │  Views   │         │      │
│  │  │  Table   │  │  Table   │  │(Statistics)│       │      │
│  │  └──────────┘  └──────────┘  └──────────┘         │      │
│  └────────────────────────────────────────────────────┘      │
└──────────────────────────────────────────────────────────────┘
```

### 🛠️ Technology Stack

#### Frontend

| Technology | Version | Purpose                                            |
| ---------- | ------- | -------------------------------------------------- |
| **React**  | 18.2.0  | UI Framework - Component-based architecture        |
| **Vite**   | 5.0.8   | Build Tool - Fast development and optimized builds |
| **Axios**  | 1.6.2   | HTTP Client - API communication                    |
| **CSS3**   | -       | Styling - Modern, responsive design                |

#### Backend

| Technology     | Version | Purpose                                    |
| -------------- | ------- | ------------------------------------------ |
| **Node.js**    | -       | Runtime Environment                        |
| **Express.js** | 4.18.2  | Web Framework - RESTful API server         |
| **MySQL2**     | 3.6.5   | Database Driver - MySQL connection         |
| **CORS**       | 2.8.5   | Middleware - Cross-Origin Resource Sharing |
| **dotenv**     | 16.3.1  | Configuration - Environment variables      |

#### Database

| Technology | Version | Purpose                                |
| ---------- | ------- | -------------------------------------- |
| **MySQL**  | 8.0+    | Relational Database - Data persistence |

### 🔄 Data Flow Diagram

```
USER ACTIONS → FRONTEND → API CALL → BACKEND → DATABASE
                  ↑                               ↓
                  └───────── RESPONSE ←───────────┘

Chi tiết:

1. Xem Danh Sách Sản Phẩm:
   User → ProductList Component → API.getAllProducts()
   → GET /api/products → reviewController.getAllProducts()
   → Database Query → Response → Display

2. Thêm Review:
   User → AddReview Form → Validation → API.createReview()
   → POST /api/reviews → reviewController.createReview()
   → Database Insert → Refresh Data → Update UI

3. Fetch Reviews Tự Động:
   User Click Button → API.fetchReviews()
   → POST /api/fetch-reviews → reviewController.fetchReviews()
   → Simulate External API → Insert Reviews → Reload All Data

4. Xem Thống Kê:
   Auto Load → API.getStatistics()
   → GET /api/statistics → reviewController.getStatistics()
   → Database View Query → Calculate Stats → Display Charts
```

---

## 3. Luồng Hoạt Động Chi Tiết

### 📱 1. Khởi Động Ứng Dụng

#### Bước 1: Backend Initialization

```
┌─ Backend Server Starts (server.js) ─────────────────┐
│                                                       │
│  1. Load Environment Variables (.env)                │
│     ├─ DB_HOST, DB_USER, DB_PASSWORD                │
│     ├─ PORT (default: 4000)                          │
│     └─ FRONTEND_URL (default: http://localhost:5173)│
│                                                       │
│  2. Initialize Express Application                    │
│     ├─ Setup CORS Middleware                         │
│     ├─ Setup JSON Parser                             │
│     └─ Setup URL Encoded Parser                      │
│                                                       │
│  3. Connect to MySQL Database (config/database.js)   │
│     ├─ Create Connection Pool (10 connections)       │
│     ├─ Test Connection                               │
│     └─ Log Success/Error                             │
│                                                       │
│  4. Register Routes (routes/reviewRoutes.js)         │
│     ├─ /api/products                                 │
│     ├─ /api/reviews                                  │
│     ├─ /api/statistics                               │
│     └─ /api/fetch-reviews                            │
│                                                       │
│  5. Start HTTP Server                                │
│     └─ Listen on Port 4000                           │
│                                                       │
│  ✅ Server Ready: http://localhost:4000              │
└───────────────────────────────────────────────────────┘
```

#### Bước 2: Frontend Initialization

```
┌─ Frontend Application Starts (main.jsx) ────────────┐
│                                                       │
│  1. React DOM Render                                 │
│     └─ Mount <App /> to #root element               │
│                                                       │
│  2. App Component Initialization (App.jsx)           │
│     ├─ Initialize State:                            │
│     │  ├─ reviews: []                               │
│     │  ├─ products: []                              │
│     │  ├─ statistics: null                          │
│     │  └─ loading: false                            │
│     │                                                │
│     └─ useEffect Hook Triggers:                     │
│        └─ loadInitialData()                         │
│                                                       │
│  3. Load Initial Data (Parallel API Calls)          │
│     ├─ API.getAllReviews()    → /api/reviews        │
│     ├─ API.getAllProducts()   → /api/products       │
│     └─ API.getStatistics()    → /api/statistics     │
│                                                       │
│  4. Render Components                                │
│     ├─ <Statistics />   - Show stats and charts     │
│     ├─ <ProductList />  - Display products grid     │
│     ├─ <AddReview />    - Review submission form    │
│     └─ <ReviewList />   - List all reviews          │
│                                                       │
│  ✅ Application Ready: http://localhost:5173         │
└───────────────────────────────────────────────────────┘
```

### 🎬 2. Các Luồng Chức Năng Chính

#### 🔹 Luồng 1: Xem Danh Sách Sản Phẩm

```javascript
// Frontend: ProductList Component
┌──────────────────────────────────────────────────────┐
│ USER                                                  │
│  │ Opens Application                                 │
│  ▼                                                    │
│ APP COMPONENT                                         │
│  │ useEffect() → loadInitialData()                  │
│  │ Calls: api.getAllProducts()                      │
│  ▼                                                    │
│ API SERVICE (services/api.js)                        │
│  │ GET Request to /api/products                     │
│  │ axios.get('http://localhost:4000/api/products')  │
│  ▼                                                    │
│ ──────── HTTP REQUEST ────────                       │
│  ▼                                                    │
│ BACKEND ROUTE (routes/reviewRoutes.js)              │
│  │ router.get('/products', ...)                     │
│  ▼                                                    │
│ CONTROLLER (controllers/reviewController.js)         │
│  │ getAllProducts()                                  │
│  │ ├─ Execute Query:                                │
│  │ │  SELECT * FROM products                        │
│  │ │  ORDER BY created_at DESC                      │
│  │ └─ Return JSON:                                  │
│  │    { success: true, data: [...] }                │
│  ▼                                                    │
│ DATABASE (MySQL)                                     │
│  │ products table                                    │
│  │ ├─ id, name, description                         │
│  │ └─ image_url, created_at                         │
│  ▼                                                    │
│ ──────── HTTP RESPONSE ────────                      │
│  ▼                                                    │
│ FRONTEND                                             │
│  │ Receive products array                           │
│  │ setState({ products: data })                     │
│  ▼                                                    │
│ PRODUCT LIST COMPONENT                               │
│  │ Map through products                             │
│  │ Render product cards:                            │
│  │ ├─ Product Image                                 │
│  │ ├─ Product Name                                  │
│  │ └─ Product Description                           │
│  ▼                                                    │
│ USER sees Product Grid on Screen                     │
└──────────────────────────────────────────────────────┘
```

**Code Reference:**

```javascript
// Frontend - ProductList.jsx (lines 18-35)
products.map((product) => (
  <div className="product-card">
    <img src={product.image_url} alt={product.name} />
    <h3>{product.name}</h3>
    <p>{product.description}</p>
  </div>
));

// Backend - reviewController.js (lines 4-21)
exports.getAllProducts = async (req, res) => {
  const [products] = await db.query(
    "SELECT * FROM products ORDER BY created_at DESC"
  );
  res.json({ success: true, data: products });
};
```

#### 🔹 Luồng 2: Thêm Đánh Giá Mới (Create Review)

```javascript
┌──────────────────────────────────────────────────────┐
│ USER                                                  │
│  │ 1. Fills out form:                               │
│  │    - Select Product                              │
│  │    - Enter Name                                  │
│  │    - Select Rating (1-5 stars)                   │
│  │    - Write Comment                               │
│  │ 2. Clicks "Submit Review" button                │
│  ▼                                                    │
│ ADD REVIEW COMPONENT (AddReview.jsx)                │
│  │ handleSubmit(event)                              │
│  │ ├─ Prevent default form submission              │
│  │ ├─ Validate required fields                     │
│  │ │  └─ Check: product_id, user_name exist        │
│  │ └─ Call: onAddReview(formData)                  │
│  ▼                                                    │
│ APP COMPONENT (App.jsx)                             │
│  │ handleAddReview(reviewData)                      │
│  │ ├─ Set loading state                            │
│  │ └─ Call: api.createReview(reviewData)           │
│  ▼                                                    │
│ API SERVICE                                          │
│  │ POST /api/reviews                                │
│  │ Body: {                                          │
│  │   product_id: 1,                                │
│  │   user_name: "John Doe",                        │
│  │   rating: 5,                                    │
│  │   comment: "Excellent product!"                 │
│  │ }                                                │
│  ▼                                                    │
│ ──────── HTTP POST REQUEST ────────                  │
│  ▼                                                    │
│ BACKEND ROUTE                                        │
│  │ router.post('/reviews', ...)                    │
│  ▼                                                    │
│ CONTROLLER - createReview()                          │
│  │                                                   │
│  │ STEP 1: Validate Input                          │
│  │ ├─ Check required fields exist                  │
│  │ ├─ Validate rating range (1-5)                  │
│  │ └─ If invalid → Return 400 Error                │
│  │                                                   │
│  │ STEP 2: Insert to Database                      │
│  │ ├─ SQL Query:                                   │
│  │ │  INSERT INTO reviews                          │
│  │ │  (product_id, user_name, rating, comment)    │
│  │ │  VALUES (?, ?, ?, ?)                          │
│  │ └─ Get insertId (new review ID)                 │
│  │                                                   │
│  │ STEP 3: Retrieve Complete Review                │
│  │ ├─ SQL Query with JOIN:                         │
│  │ │  SELECT r.*, p.name as product_name           │
│  │ │  FROM reviews r                               │
│  │ │  JOIN products p ON r.product_id = p.id       │
│  │ │  WHERE r.id = ?                               │
│  │ └─ Return enriched review data                  │
│  ▼                                                    │
│ DATABASE                                             │
│  │ reviews table INSERT                             │
│  │ ├─ Auto-increment ID                            │
│  │ ├─ FOREIGN KEY check (product_id exists)        │
│  │ ├─ CHECK constraint (rating 1-5)                │
│  │ └─ created_at = CURRENT_TIMESTAMP               │
│  ▼                                                    │
│ ──────── HTTP RESPONSE ────────                      │
│  │ Status: 201 Created                             │
│  │ Body: {                                         │
│  │   success: true,                                │
│  │   message: "Review created successfully!",      │
│  │   data: { id, product_id, user_name, ... }     │
│  │ }                                                │
│  ▼                                                    │
│ FRONTEND - Success Handler                          │
│  │ 1. Show success alert                           │
│  │ 2. Reset form fields                            │
│  │ 3. Call loadInitialData()                       │
│  │    └─ Refresh all data (reviews, statistics)   │
│  ▼                                                    │
│ UI UPDATES                                           │
│  │ 1. New review appears in ReviewList             │
│  │ 2. Statistics updated (avg rating, count)       │
│  │ 3. Form cleared and ready for next input        │
│  ▼                                                    │
│ USER sees updated review list                        │
└──────────────────────────────────────────────────────┘
```

**Validation Logic:**

```javascript
// Backend Validation (reviewController.js lines 80-94)
if (!product_id || !user_name || !rating) {
  return res.status(400).json({
    message: "Please provide all required fields",
  });
}

if (rating < 1 || rating > 5) {
  return res.status(400).json({
    message: "Rating must be between 1 and 5",
  });
}
```

#### 🔹 Luồng 3: Fetch Reviews Tự Động (Auto-Fetch External Reviews)

```javascript
┌──────────────────────────────────────────────────────┐
│ USER                                                  │
│  │ Clicks "🔄 Fetch Reviews" button                │
│  ▼                                                    │
│ APP COMPONENT                                         │
│  │ handleFetchReviews()                             │
│  │ ├─ Set loading state                            │
│  │ ├─ Show message: "⏳ Fetching..."               │
│  │ └─ Call: api.fetchReviews()                     │
│  ▼                                                    │
│ API SERVICE                                          │
│  │ POST /api/fetch-reviews                          │
│  ▼                                                    │
│ BACKEND CONTROLLER - fetchReviews()                  │
│  │                                                   │
│  │ STEP 1: Simulate External API Call              │
│  │ ├─ Generate random reviews:                     │
│  │ │  const externalReviews = [                    │
│  │ │    {                                           │
│  │ │      product_id: random(1-4),                 │
│  │ │      user_name: "User_" + timestamp,          │
│  │ │      rating: random(1-5),                     │
│  │ │      comment: "Review from external system"   │
│  │ │    },                                          │
│  │ │    { ... } // Second review                   │
│  │ │  ]                                             │
│  │ │                                                │
│  │ │  NOTE: Trong thực tế, đây sẽ là:             │
│  │ │  - Gọi API của Google Reviews                │
│  │ │  - Scrape data từ Facebook                   │
│  │ │  - Lấy từ Amazon Product Reviews             │
│  │ │  - Integrate với các platform khác           │
│  │ │                                                │
│  │ STEP 2: Insert Each Review to Database          │
│  │ ├─ Loop through externalReviews                │
│  │ │  FOR each review:                             │
│  │ │    ├─ INSERT INTO reviews table              │
│  │ │    ├─ Get new review ID                      │
│  │ │    ├─ SELECT complete review data            │
│  │ │    └─ Add to insertedReviews array           │
│  │ │                                                │
│  │ STEP 3: Return Results                          │
│  │ └─ Response: {                                  │
│  │      success: true,                             │
│  │      message: "Fetched 2 new reviews!",         │
│  │      data: [...]                                │
│  │    }                                             │
│  ▼                                                    │
│ DATABASE                                             │
│  │ Multiple INSERT operations                       │
│  │ ├─ Review 1 inserted                            │
│  │ └─ Review 2 inserted                            │
│  ▼                                                    │
│ FRONTEND - Success Handler                          │
│  │ 1. Show success message                         │
│  │ 2. Call loadInitialData()                       │
│  │    ├─ Reload reviews                            │
│  │    ├─ Reload statistics                         │
│  │    └─ Update all components                     │
│  │ 3. Auto-hide message after 3 seconds            │
│  ▼                                                    │
│ UI FULLY UPDATED                                     │
│  │ - New reviews in list                           │
│  │ - Updated statistics                            │
│  │ - Updated charts                                │
│  ▼                                                    │
│ USER sees fresh data                                 │
└──────────────────────────────────────────────────────┘
```

**Real-World Integration Examples:**

```javascript
// Ví dụ tích hợp thực tế (Pseudo-code)

// 1. Google Reviews API
const googleReviews = await fetch(
  "https://maps.googleapis.com/maps/api/place/details/json",
  { params: { place_id: YOUR_PLACE_ID } }
);

// 2. Facebook Graph API
const fbReviews = await fetch(
  "https://graph.facebook.com/v12.0/PAGE_ID/ratings",
  { headers: { Authorization: "Bearer " + ACCESS_TOKEN } }
);

// 3. Amazon Product API
const amazonReviews = await scrapeAmazonReviews(productUrl);

// 4. Custom Web Scraping
const reviews = await puppeteer.scrape(targetWebsite);
```

#### 🔹 Luồng 4: Hiển Thị Thống Kê (Statistics Dashboard)

```javascript
┌──────────────────────────────────────────────────────┐
│ AUTOMATIC LOAD (on page load)                        │
│  ▼                                                    │
│ API.getStatistics()                                  │
│  │ GET /api/statistics                              │
│  ▼                                                    │
│ BACKEND CONTROLLER - getStatistics()                 │
│  │                                                   │
│  │ QUERY 1: Get Statistics by Product              │
│  │ ├─ SELECT FROM review_statistics VIEW           │
│  │ └─ Returns:                                      │
│  │    [                                             │
│  │      {                                           │
│  │        product_id: 1,                           │
│  │        product_name: "iPhone 15",               │
│  │        total_reviews: 3,                        │
│  │        average_rating: 4.67,                    │
│  │        five_star: 2,                            │
│  │        four_star: 1,                            │
│  │        three_star: 0,                           │
│  │        two_star: 0,                             │
│  │        one_star: 0                              │
│  │      },                                          │
│  │      { ... }                                     │
│  │    ]                                             │
│  │                                                   │
│  │ QUERY 2: Get Overall Statistics                 │
│  │ ├─ Complex aggregation query:                   │
│  │ │  SELECT                                        │
│  │ │    COUNT(DISTINCT product_id) as total_products│
│  │ │    COUNT(*) as total_reviews,                 │
│  │ │    AVG(rating) as overall_average_rating,     │
│  │ │    SUM(CASE WHEN rating=5...) as total_five_star│
│  │ │    ... (for each star level)                  │
│  │ │  FROM reviews                                  │
│  │ └─ Returns:                                      │
│  │    {                                             │
│  │      total_products: 4,                         │
│  │      total_reviews: 8,                          │
│  │      overall_average_rating: 4.5,               │
│  │      total_five_star: 5,                        │
│  │      total_four_star: 3,                        │
│  │      ...                                         │
│  │    }                                             │
│  │                                                   │
│  │ RESPONSE:                                        │
│  │ {                                                │
│  │   success: true,                                │
│  │   data: {                                       │
│  │     byProduct: [...],  // Array per product    │
│  │     overall: {...}      // Aggregated stats    │
│  │   }                                              │
│  │ }                                                │
│  ▼                                                    │
│ FRONTEND - Statistics Component                     │
│  │                                                   │
│  │ SECTION 1: Overall Cards                        │
│  │ ┌─────────────┬─────────────┬─────────────┐    │
│  │ │   📦 4      │   💬 8      │  ⭐ 4.5     │    │
│  │ │  Products   │   Reviews   │ Avg Rating  │    │
│  │ └─────────────┴─────────────┴─────────────┘    │
│  │                                                   │
│  │ SECTION 2: Rating Distribution Chart            │
│  │ 5 ⭐ ████████████████████ 5 (62.5%)             │
│  │ 4 ⭐ ███████████ 3 (37.5%)                      │
│  │ 3 ⭐ ▒▒▒▒▒▒▒▒▒▒ 0 (0%)                          │
│  │ 2 ⭐ ▒▒▒▒▒▒▒▒▒▒ 0 (0%)                          │
│  │ 1 ⭐ ▒▒▒▒▒▒▒▒▒▒ 0 (0%)                          │
│  │                                                   │
│  │ SECTION 3: Per-Product Statistics Grid          │
│  │ ┌─────────────────┬─────────────────┐           │
│  │ │ iPhone 15 Pro   │ Samsung S24     │           │
│  │ │ Reviews: 3      │ Reviews: 2      │           │
│  │ │ Avg: ⭐ 4.7     │ Avg: ⭐ 4.5     │           │
│  │ │ 5⭐: 2  4⭐: 1  │ 5⭐: 1  4⭐: 1  │           │
│  │ └─────────────────┴─────────────────┘           │
│  │ ┌─────────────────┬─────────────────┐           │
│  │ │ MacBook Pro M3  │ AirPods Pro 2   │           │
│  │ │ Reviews: 2      │ Reviews: 1      │           │
│  │ │ Avg: ⭐ 5.0     │ Avg: ⭐ 4.0     │           │
│  │ └─────────────────┴─────────────────┘           │
│  ▼                                                    │
│ USER sees comprehensive statistics dashboard         │
└──────────────────────────────────────────────────────┘
```

**Database View for Statistics:**

```sql
-- review_statistics VIEW (schema.sql lines 50-63)
CREATE OR REPLACE VIEW review_statistics AS
SELECT
    p.id as product_id,
    p.name as product_name,
    COUNT(r.id) as total_reviews,
    AVG(r.rating) as average_rating,
    SUM(CASE WHEN r.rating = 5 THEN 1 ELSE 0 END) as five_star,
    SUM(CASE WHEN r.rating = 4 THEN 1 ELSE 0 END) as four_star,
    SUM(CASE WHEN r.rating = 3 THEN 1 ELSE 0 END) as three_star,
    SUM(CASE WHEN r.rating = 2 THEN 1 ELSE 0 END) as two_star,
    SUM(CASE WHEN r.rating = 1 THEN 1 ELSE 0 END) as one_star
FROM products p
LEFT JOIN reviews r ON p.id = r.product_id
GROUP BY p.id, p.name;
```

---

## 4. Hướng Dẫn Cài Đặt

### 📋 Yêu Cầu Hệ Thống

| Component   | Requirement | Download Link                    |
| ----------- | ----------- | -------------------------------- |
| **Node.js** | v16.0+      | https://nodejs.org/              |
| **MySQL**   | v8.0+       | https://dev.mysql.com/downloads/ |
| **npm**     | v8.0+       | (included with Node.js)          |
| **Git**     | Latest      | https://git-scm.com/             |

### 🚀 Cài Đặt Từng Bước

#### Bước 1: Clone Repository

```bash
# Clone dự án từ Git
git clone <repository-url>
cd WebFullStack
```

#### Bước 2: Cài Đặt Backend

```bash
# Di chuyển vào thư mục backend
cd backend

# Cài đặt dependencies
npm install

# Cấu trúc dependencies sẽ được cài:
# ├─ express@4.18.2       (Web framework)
# ├─ mysql2@3.6.5         (MySQL driver)
# ├─ cors@2.8.5           (CORS middleware)
# ├─ dotenv@16.3.1        (Environment config)
# ├─ axios@1.6.2          (HTTP client)
# └─ nodemon@3.0.2        (Dev tool - auto-reload)
```

#### Bước 3: Cấu Hình Database

```bash
# 1. Đăng nhập vào MySQL
mysql -u root -p

# 2. Chạy script tạo database và tables
source database/schema.sql

# Hoặc copy-paste nội dung từ schema.sql vào MySQL Workbench

# Script sẽ thực hiện:
# ✓ Tạo database: reviews_db
# ✓ Tạo bảng: products, reviews
# ✓ Tạo view: review_statistics
# ✓ Insert dữ liệu mẫu (4 products, 8 reviews)
```

#### Bước 4: Cấu Hình Environment Variables

```bash
# Tạo file .env trong thư mục backend
touch .env

# Nội dung file .env:
PORT=4000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password_here
DB_NAME=reviews_db
DB_PORT=3306
```

**⚠️ Lưu ý Bảo Mật:**

- ❌ **KHÔNG BAO GIỜ** commit file `.env` lên Git
- ✅ File `.env` đã được thêm vào `.gitignore`
- ✅ Sử dụng `.env.example` để share template

```bash
# Tạo .env.example (template không chứa thông tin nhạy cảm)
cat > .env.example << EOF
PORT=4000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=reviews_db
DB_PORT=3306
EOF
```

#### Bước 5: Khởi Động Backend

```bash
# Development mode (auto-reload khi code thay đổi)
npm run dev

# Production mode
npm start

# Kiểm tra server hoạt động:
# Mở browser: http://localhost:4000
# Expected output:
# {
#   "message": "🚀 Reviews API Server",
#   "version": "1.0.0",
#   "endpoints": { ... }
# }
```

#### Bước 6: Cài Đặt Frontend

```bash
# Mở terminal mới, di chuyển vào thư mục frontend
cd frontend

# Cài đặt dependencies
npm install

# Cấu trúc dependencies:
# ├─ react@18.2.0              (UI Library)
# ├─ react-dom@18.2.0          (React DOM renderer)
# ├─ axios@1.6.2               (HTTP client)
# ├─ vite@5.0.8                (Build tool)
# └─ @vitejs/plugin-react@4.2.1 (React plugin for Vite)
```

#### Bước 7: Khởi Động Frontend

```bash
# Development mode
npm run dev

# Vite sẽ start dev server:
# ➜  Local:   http://localhost:5173/
# ➜  Network: use --host to expose

# Mở browser và truy cập: http://localhost:5173
```

### ✅ Xác Nhận Cài Đặt Thành Công

```
Checklist:
┌─────────────────────────────────────────────────┐
│ ✅ Backend running on http://localhost:4000     │
│ ✅ Frontend running on http://localhost:5173    │
│ ✅ MySQL database connected                     │
│ ✅ Sample data loaded                           │
│ ✅ Can view products list                       │
│ ✅ Can add new review                           │
│ ✅ Statistics displaying correctly              │
│ ✅ Fetch reviews button working                 │
└─────────────────────────────────────────────────┘
```

### 🐛 Troubleshooting Common Issues

#### Issue 1: MySQL Connection Error

```
❌ Error: ER_ACCESS_DENIED_ERROR

✅ Solution:
1. Kiểm tra username/password trong .env
2. Đảm bảo MySQL service đang chạy:
   - Windows: Services → MySQL → Start
   - Mac: brew services start mysql
   - Linux: sudo systemctl start mysql
```

#### Issue 2: Port Already in Use

```
❌ Error: EADDRINUSE: address already in use :::4000

✅ Solution:
# Tìm và kill process đang dùng port
# Windows:
netstat -ano | findstr :4000
taskkill /PID <PID> /F

# Mac/Linux:
lsof -ti:4000 | xargs kill -9
```

#### Issue 3: CORS Error

```
❌ Error: CORS policy blocked

✅ Solution:
1. Kiểm tra FRONTEND_URL trong .env backend
2. Đảm bảo CORS middleware đã được setup
3. Kiểm tra API_BASE_URL trong frontend/src/services/api.js
```

---

## 5. Cấu Trúc Database

### 📊 Database Schema

```
Database: reviews_db
├─ Character Set: utf8mb4
└─ Collation: utf8mb4_unicode_ci (hỗ trợ Unicode đầy đủ)
```

### 🗃️ Table: products

```sql
CREATE TABLE products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    image_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;
```

**Mô tả các trường:**

| Field         | Type         | Null | Description                    |
| ------------- | ------------ | ---- | ------------------------------ |
| `id`          | INT          | NO   | Primary Key - Tự động tăng     |
| `name`        | VARCHAR(255) | NO   | Tên sản phẩm                   |
| `description` | TEXT         | YES  | Mô tả chi tiết sản phẩm        |
| `image_url`   | VARCHAR(500) | YES  | URL hình ảnh (Unsplash)        |
| `created_at`  | TIMESTAMP    | NO   | Thời gian tạo (auto)           |
| `updated_at`  | TIMESTAMP    | NO   | Thời gian cập nhật cuối (auto) |

**Sample Data:**

```sql
INSERT INTO products VALUES
(1, 'iPhone 15 Pro Max',
    'Premium smartphone from Apple with A17 Pro chip',
    'https://images.unsplash.com/photo-1592286927505-38c8853b4a19?w=400',
    '2025-01-01 10:00:00', '2025-01-01 10:00:00'),
(2, 'Samsung Galaxy S24',
    'Flagship Android device with excellent camera',
    'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400',
    '2025-01-01 10:00:00', '2025-01-01 10:00:00'),
-- ... more products
```

### 🗃️ Table: reviews

```sql
CREATE TABLE reviews (
    id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT NOT NULL,
    user_name VARCHAR(100) NOT NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    INDEX idx_product_id (product_id),
    INDEX idx_rating (rating),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB;
```

**Mô tả các trường:**

| Field        | Type         | Null | Description                               |
| ------------ | ------------ | ---- | ----------------------------------------- |
| `id`         | INT          | NO   | Primary Key                               |
| `product_id` | INT          | NO   | Foreign Key → products.id                 |
| `user_name`  | VARCHAR(100) | NO   | Tên người đánh giá                        |
| `rating`     | INT          | NO   | Điểm đánh giá (1-5) - có CHECK constraint |
| `comment`    | TEXT         | YES  | Nội dung review (optional)                |
| `created_at` | TIMESTAMP    | NO   | Thời gian tạo                             |
| `updated_at` | TIMESTAMP    | NO   | Thời gian cập nhật                        |

**Indexes & Constraints:**

```
1. PRIMARY KEY: id
2. FOREIGN KEY: product_id → products(id)
   - ON DELETE CASCADE: Xóa product → xóa tất cả reviews
3. CHECK CONSTRAINT: rating BETWEEN 1 AND 5
4. INDEX on product_id: Tăng tốc query by product
5. INDEX on rating: Tối ưu thống kê rating
6. INDEX on created_at: Sắp xếp theo thời gian
```

**Sample Data:**

```sql
INSERT INTO reviews VALUES
(1, 1, 'John Smith', 5, 'Amazing product! Camera is beautiful',
    '2025-01-15 08:30:00', '2025-01-15 08:30:00'),
(2, 1, 'Emily Johnson', 4, 'Good but price is a bit high',
    '2025-01-16 14:20:00', '2025-01-16 14:20:00'),
-- ... more reviews
```

### 📈 View: review_statistics

```sql
CREATE OR REPLACE VIEW review_statistics AS
SELECT
    p.id as product_id,
    p.name as product_name,
    COUNT(r.id) as total_reviews,
    AVG(r.rating) as average_rating,
    SUM(CASE WHEN r.rating = 5 THEN 1 ELSE 0 END) as five_star,
    SUM(CASE WHEN r.rating = 4 THEN 1 ELSE 0 END) as four_star,
    SUM(CASE WHEN r.rating = 3 THEN 1 ELSE 0 END) as three_star,
    SUM(CASE WHEN r.rating = 2 THEN 1 ELSE 0 END) as two_star,
    SUM(CASE WHEN r.rating = 1 THEN 1 ELSE 0 END) as one_star
FROM products p
LEFT JOIN reviews r ON p.id = r.product_id
GROUP BY p.id, p.name;
```

**Mục đích:**

- ✅ Tính toán sẵn thống kê cho mỗi sản phẩm
- ✅ Tối ưu performance (không cần tính lại mỗi lần query)
- ✅ Đơn giản hóa query trong controller

**Ví dụ Output:**

```
+------------+-----------------+---------------+-----------------+-----------+
| product_id | product_name    | total_reviews | average_rating  | five_star |
+------------+-----------------+---------------+-----------------+-----------+
|          1 | iPhone 15 Pro   |             3 |          4.6667 |         2 |
|          2 | Samsung S24     |             2 |          4.5000 |         1 |
|          3 | MacBook Pro M3  |             2 |          5.0000 |         2 |
|          4 | AirPods Pro 2   |             1 |          4.0000 |         0 |
+------------+-----------------+---------------+-----------------+-----------+
```

### 🔗 Entity Relationship Diagram (ERD)

```
┌────────────────────────┐
│      PRODUCTS          │
├────────────────────────┤
│ 🔑 id (PK)            │
│    name               │
│    description        │
│    image_url          │
│    created_at         │
│    updated_at         │
└────────────────────────┘
           │
           │ 1:N relationship
           │ (1 product has many reviews)
           │
           ▼
┌────────────────────────┐
│       REVIEWS          │
├────────────────────────┤
│ 🔑 id (PK)            │
│ 🔗 product_id (FK)    │─────┐
│    user_name          │     │ References
│    rating (1-5)       │     └─► products.id
│    comment            │
│    created_at         │         ON DELETE CASCADE
│    updated_at         │
└────────────────────────┘
           │
           │ Used by
           ▼
┌────────────────────────┐
│  REVIEW_STATISTICS     │
│      (VIEW)            │
├────────────────────────┤
│ product_id            │
│ product_name          │
│ total_reviews         │
│ average_rating        │
│ five_star             │
│ four_star             │
│ three_star            │
│ two_star              │
│ one_star              │
└────────────────────────┘
```

---

## 6. API Documentation

### 📡 Base URL

```
Development: http://localhost:4000/api
Production: https://your-domain.com/api
```

### 🔐 Authentication

**Current Version:** No authentication required
**Future:** Consider implementing JWT tokens for protected routes

### 📋 Endpoints Summary

| Method | Endpoint                      | Description                     |
| ------ | ----------------------------- | ------------------------------- |
| GET    | `/products`                   | Lấy danh sách tất cả sản phẩm   |
| GET    | `/reviews`                    | Lấy tất cả reviews              |
| GET    | `/reviews/product/:productId` | Lấy reviews theo sản phẩm       |
| POST   | `/reviews`                    | Tạo review mới                  |
| GET    | `/statistics`                 | Lấy thống kê tổng quan          |
| POST   | `/fetch-reviews`              | Fetch reviews từ nguồn external |

---

### 1️⃣ GET /api/products

**Mô tả:** Lấy danh sách tất cả sản phẩm

**Request:**

```http
GET http://localhost:4000/api/products
```

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "iPhone 15 Pro Max",
      "description": "Premium smartphone from Apple with A17 Pro chip",
      "image_url": "https://images.unsplash.com/photo-1592286927505-38c8853b4a19?w=400",
      "created_at": "2025-01-01T10:00:00.000Z",
      "updated_at": "2025-01-01T10:00:00.000Z"
    },
    {
      "id": 2,
      "name": "Samsung Galaxy S24",
      "description": "Flagship Android device with excellent camera",
      "image_url": "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400",
      "created_at": "2025-01-01T10:00:00.000Z",
      "updated_at": "2025-01-01T10:00:00.000Z"
    }
  ]
}
```

**Status Codes:**

- `200 OK`: Success
- `500 Internal Server Error`: Database error

**Example cURL:**

```bash
curl -X GET http://localhost:4000/api/products
```

---

### 2️⃣ GET /api/reviews

**Mô tả:** Lấy tất cả reviews kèm thông tin sản phẩm

**Request:**

```http
GET http://localhost:4000/api/reviews
```

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "product_id": 1,
      "user_name": "John Smith",
      "rating": 5,
      "comment": "Amazing product! Camera is beautiful and super smooth.",
      "created_at": "2025-01-15T08:30:00.000Z",
      "updated_at": "2025-01-15T08:30:00.000Z",
      "product_name": "iPhone 15 Pro Max",
      "product_image": "https://images.unsplash.com/photo-1592286927505-38c8853b4a19?w=400"
    },
    {
      "id": 2,
      "product_id": 1,
      "user_name": "Emily Johnson",
      "rating": 4,
      "comment": "Good but price is a bit high compared to specs.",
      "created_at": "2025-01-16T14:20:00.000Z",
      "updated_at": "2025-01-16T14:20:00.000Z",
      "product_name": "iPhone 15 Pro Max",
      "product_image": "https://images.unsplash.com/photo-1592286927505-38c8853b4a19?w=400"
    }
  ]
}
```

**Status Codes:**

- `200 OK`: Success
- `500 Internal Server Error`: Database error

---

### 3️⃣ GET /api/reviews/product/:productId

**Mô tả:** Lấy tất cả reviews của một sản phẩm cụ thể

**Request:**

```http
GET http://localhost:4000/api/reviews/product/1
```

**Parameters:**

- `productId` (path parameter): ID của sản phẩm

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "product_id": 1,
      "user_name": "John Smith",
      "rating": 5,
      "comment": "Amazing product!",
      "created_at": "2025-01-15T08:30:00.000Z",
      "product_name": "iPhone 15 Pro Max"
    }
  ]
}
```

**Status Codes:**

- `200 OK`: Success (empty array if no reviews)
- `500 Internal Server Error`: Database error

---

### 4️⃣ POST /api/reviews

**Mô tả:** Tạo review mới

**Request:**

```http
POST http://localhost:4000/api/reviews
Content-Type: application/json

{
  "product_id": 1,
  "user_name": "Jane Doe",
  "rating": 5,
  "comment": "Excellent product, highly recommended!"
}
```

**Request Body:**

| Field        | Type    | Required | Validation                   |
| ------------ | ------- | -------- | ---------------------------- |
| `product_id` | integer | ✅ Yes   | Must exist in products table |
| `user_name`  | string  | ✅ Yes   | Max 100 characters           |
| `rating`     | integer | ✅ Yes   | Must be 1-5                  |
| `comment`    | string  | ❌ No    | Text, optional               |

**Response (Success):**

```json
{
  "success": true,
  "message": "Review created successfully!",
  "data": {
    "id": 9,
    "product_id": 1,
    "user_name": "Jane Doe",
    "rating": 5,
    "comment": "Excellent product, highly recommended!",
    "created_at": "2025-01-20T16:45:00.000Z",
    "updated_at": "2025-01-20T16:45:00.000Z",
    "product_name": "iPhone 15 Pro Max"
  }
}
```

**Response (Validation Error):**

```json
{
  "success": false,
  "message": "Please provide all required fields (product_id, user_name, rating)"
}
```

```json
{
  "success": false,
  "message": "Rating must be between 1 and 5"
}
```

**Status Codes:**

- `201 Created`: Review created successfully
- `400 Bad Request`: Validation error
- `500 Internal Server Error`: Database error

**Example cURL:**

```bash
curl -X POST http://localhost:4000/api/reviews \
  -H "Content-Type: application/json" \
  -d '{
    "product_id": 1,
    "user_name": "Jane Doe",
    "rating": 5,
    "comment": "Great product!"
  }'
```

---

### 5️⃣ GET /api/statistics

**Mô tả:** Lấy thống kê tổng quan và theo từng sản phẩm

**Request:**

```http
GET http://localhost:4000/api/statistics
```

**Response:**

```json
{
  "success": true,
  "data": {
    "byProduct": [
      {
        "product_id": 1,
        "product_name": "iPhone 15 Pro Max",
        "total_reviews": 3,
        "average_rating": 4.6667,
        "five_star": 2,
        "four_star": 1,
        "three_star": 0,
        "two_star": 0,
        "one_star": 0
      },
      {
        "product_id": 2,
        "product_name": "Samsung Galaxy S24",
        "total_reviews": 2,
        "average_rating": 4.5,
        "five_star": 1,
        "four_star": 1,
        "three_star": 0,
        "two_star": 0,
        "one_star": 0
      }
    ],
    "overall": {
      "total_products": 4,
      "total_reviews": 8,
      "overall_average_rating": 4.625,
      "total_five_star": 5,
      "total_four_star": 3,
      "total_three_star": 0,
      "total_two_star": 0,
      "total_one_star": 0
    }
  }
}
```

**Response Fields:**

**byProduct Array:**

- `product_id`: ID sản phẩm
- `product_name`: Tên sản phẩm
- `total_reviews`: Tổng số reviews
- `average_rating`: Điểm trung bình (float)
- `five_star` to `one_star`: Số lượng mỗi loại rating

**overall Object:**

- `total_products`: Tổng số sản phẩm có review
- `total_reviews`: Tổng số tất cả reviews
- `overall_average_rating`: Điểm TB chung
- `total_five_star` to `total_one_star`: Tổng số mỗi loại rating

**Status Codes:**

- `200 OK`: Success
- `500 Internal Server Error`: Database error

---

### 6️⃣ POST /api/fetch-reviews

**Mô tả:** Fetch và lưu reviews từ nguồn external (simulated)

**Request:**

```http
POST http://localhost:4000/api/fetch-reviews
```

**Response:**

```json
{
  "success": true,
  "message": "Successfully fetched 2 new reviews!",
  "data": [
    {
      "id": 10,
      "product_id": 3,
      "user_name": "User_1737385200000",
      "rating": 4,
      "comment": "New review fetched from external system!",
      "created_at": "2025-01-20T17:00:00.000Z",
      "updated_at": "2025-01-20T17:00:00.000Z",
      "product_name": "MacBook Pro M3",
      "product_image": "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400"
    },
    {
      "id": 11,
      "product_id": 2,
      "user_name": "AutoFetch_1737385200000",
      "rating": 5,
      "comment": "Automatically collected review - great product!",
      "created_at": "2025-01-20T17:00:00.000Z",
      "updated_at": "2025-01-20T17:00:00.000Z",
      "product_name": "Samsung Galaxy S24",
      "product_image": "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400"
    }
  ]
}
```

**Logic:**

- Hiện tại: Simulate bằng cách generate random reviews
- Thực tế: Tích hợp với Google Reviews API, Facebook API, etc.

**Status Codes:**

- `200 OK`: Success
- `500 Internal Server Error`: Database or external API error

**Example cURL:**

```bash
curl -X POST http://localhost:4000/api/fetch-reviews
```

---

### 🔧 Error Response Format

Tất cả errors đều follow cấu trúc:

```json
{
  "success": false,
  "message": "Error description here",
  "error": "Detailed error (only in development mode)"
}
```

**Common HTTP Status Codes:**

| Code  | Meaning               | When it happens          |
| ----- | --------------------- | ------------------------ |
| `200` | OK                    | Successful GET request   |
| `201` | Created               | Successful POST (create) |
| `400` | Bad Request           | Validation failed        |
| `404` | Not Found             | Endpoint not exist       |
| `500` | Internal Server Error | Database or server error |

---

## 7. Cấu Trúc Dự Án

### 📁 Backend Structure

```
backend/
│
├── config/
│   └── database.js              # MySQL connection configuration
│                                 # - Connection pooling setup
│                                 # - Promise wrapper for async/await
│
├── controllers/
│   └── reviewController.js      # Business logic layer
│                                 # - getAllProducts()
│                                 # - getAllReviews()
│                                 # - getReviewsByProduct()
│                                 # - createReview()
│                                 # - getStatistics()
│                                 # - fetchReviews()
│
├── database/
│   └── schema.sql               # Database schema & sample data
│                                 # - CREATE DATABASE
│                                 # - CREATE TABLES
│                                 # - CREATE VIEW
│                                 # - INSERT sample data
│
├── routes/
│   └── reviewRoutes.js          # API route definitions
│                                 # - Map URLs to controller methods
│
├── node_modules/                # Dependencies (auto-generated)
│
├── .env                         # Environment variables (SECRET!)
│   # Contains:
│   # - Database credentials
│   # - Server port
│   # - Frontend URL
│
├── .env.example                 # Environment template (safe to commit)
│
├── package.json                 # Project metadata & dependencies
│   # Scripts:
│   # - npm start     : Production mode
│   # - npm run dev   : Development mode (nodemon)
│
├── package-lock.json            # Dependency lock file
│
├── server.js                    # Application entry point
│                                 # - Express app setup
│                                 # - Middleware configuration
│                                 # - Route registration
│                                 # - Error handling
│                                 # - Server startup
│
└── ENV_CONFIGURATION.md         # Environment setup guide
```

### 📁 Frontend Structure

```
frontend/
│
├── src/
│   │
│   ├── components/              # React components
│   │   │
│   │   ├── ProductList.jsx      # Products grid display
│   │   │                         # - Map products to cards
│   │   │                         # - Show image, name, description
│   │   ├── ProductList.css
│   │   │
│   │   ├── ReviewList.jsx       # Reviews list display
│   │   │                         # - Render each review card
│   │   │                         # - Show rating stars
│   │   │                         # - Format date
│   │   ├── ReviewList.css
│   │   │
│   │   ├── AddReview.jsx        # Review submission form
│   │   │                         # - Product selector
│   │   │                         # - User name input
│   │   │                         # - Rating slider (1-5)
│   │   │                         # - Comment textarea
│   │   │                         # - Form validation
│   │   ├── AddReview.css
│   │   │
│   │   ├── Statistics.jsx       # Statistics dashboard
│   │   │                         # - Overall stats cards
│   │   │                         # - Rating distribution chart
│   │   │                         # - Per-product statistics
│   │   └── Statistics.css
│   │
│   ├── services/
│   │   └── api.js               # API client wrapper
│   │                             # - Axios configuration
│   │                             # - API method definitions
│   │                             # - Response interceptors
│   │                             # - Error handling
│   │
│   ├── App.jsx                  # Main application component
│   │                             # - State management
│   │                             # - Data loading logic
│   │                             # - Component composition
│   │                             # - Event handlers
│   │
│   ├── App.css                  # Main app styles
│   │
│   ├── main.jsx                 # Application entry point
│   │                             # - ReactDOM.render()
│   │
│   └── index.css                # Global styles
│                                 # - CSS reset
│                                 # - Global variables
│                                 # - Base styles
│
├── public/                      # Static assets
│
├── node_modules/                # Dependencies
│
├── index.html                   # HTML template
│                                 # - <div id="root"></div>
│
├── vite.config.js               # Vite configuration
│                                 # - React plugin setup
│                                 # - Build settings
│
├── package.json                 # Project metadata
│   # Scripts:
│   # - npm run dev     : Dev server (port 5173)
│   # - npm run build   : Production build
│   # - npm run preview : Preview prod build
│
└── package-lock.json            # Dependency lock file
```

### 🗂️ Component Hierarchy

```
<App>                            (App.jsx - Root component)
  │
  ├─ Header
  │   └─ Title + Subtitle
  │
  ├─ Error/Info Messages
  │   ├─ Error Alert (if error exists)
  │   └─ Fetch Message (success/loading)
  │
  ├─ Fetch Reviews Section
  │   └─ Button: "🔄 Fetch Reviews"
  │
  ├─ <Statistics>                (Statistics.jsx)
  │   ├─ Overall Stats Cards
  │   │   ├─ Total Products
  │   │   ├─ Total Reviews
  │   │   └─ Average Rating
  │   ├─ Rating Distribution Chart
  │   │   └─ 5-star to 1-star bars
  │   └─ Per-Product Stats Grid
  │       └─ Product stat cards
  │
  ├─ <ProductList>               (ProductList.jsx)
  │   └─ Product Grid
  │       └─ Product Cards
  │           ├─ Image
  │           ├─ Name
  │           └─ Description
  │
  ├─ <AddReview>                 (AddReview.jsx)
  │   └─ Form
  │       ├─ Product Select
  │       ├─ User Name Input
  │       ├─ Rating Slider
  │       ├─ Comment Textarea
  │       └─ Submit Button
  │
  ├─ <ReviewList>                (ReviewList.jsx)
  │   └─ Review Cards
  │       ├─ Product Info + Image
  │       ├─ User Name
  │       ├─ Rating Stars
  │       ├─ Comment
  │       └─ Date
  │
  └─ Footer
```

### 📊 State Management Flow

```
App Component State:
┌────────────────────────────────────────┐
│ const [reviews, setReviews]           │ ← Reviews array
│ const [products, setProducts]         │ ← Products array
│ const [statistics, setStatistics]     │ ← Stats object
│ const [loading, setLoading]           │ ← Loading state
│ const [error, setError]               │ ← Error message
│ const [fetchMessage, setFetchMessage] │ ← Fetch status msg
└────────────────────────────────────────┘
         │
         ├─► Pass to <Statistics data={statistics} />
         ├─► Pass to <ProductList products={products} />
         ├─► Pass to <AddReview products={products} />
         └─► Pass to <ReviewList reviews={reviews} />

State Updates Trigger:
1. Initial Load (useEffect) → loadInitialData()
2. Add Review → handleAddReview() → loadInitialData()
3. Fetch Reviews → handleFetchReviews() → loadInitialData()
```

---

## 8. Các Tính Năng Chính

### ✨ Feature 1: Product Management

**Chức năng:**

- Hiển thị danh sách sản phẩm dạng grid
- Responsive layout (desktop/mobile)
- Hiển thị hình ảnh từ Unsplash
- Hiển thị tên và mô tả sản phẩm

**Implementation:**

```jsx
// ProductList.jsx
products.map((product) => (
  <div className="product-card">
    <img src={product.image_url} alt={product.name} />
    <h3>{product.name}</h3>
    <p>{product.description}</p>
  </div>
));
```

**CSS Features:**

- Grid layout với auto-fit
- Hover effects
- Card shadows
- Image lazy loading

---

### ✨ Feature 2: Review Management

**Chức năng:**

- Xem tất cả reviews
- Thêm review mới (form validation)
- Hiển thị rating bằng stars
- Format timestamp
- Hiển thị product info trong mỗi review

**Form Validation:**

```javascript
// AddReview.jsx - handleSubmit
- Required fields: product_id, user_name, rating
- Rating range: 1-5 (slider UI)
- Comment: Optional
- Show error alert if validation fails
```

**Star Rating Display:**

```javascript
const renderStars = (rating) => {
  return "⭐".repeat(rating) + "☆".repeat(5 - rating);
};

// Example: rating = 4
// Output: ⭐⭐⭐⭐☆
```

---

### ✨ Feature 3: Advanced Statistics Dashboard

**Tính năng hiển thị:**

1. **Overall Statistics Cards:**

   - Total Products
   - Total Reviews
   - Average Rating

2. **Rating Distribution Chart:**

   - Horizontal bar chart
   - Show count and percentage
   - Color-coded bars

3. **Per-Product Statistics:**
   - Grid layout
   - Individual product stats
   - Average rating per product
   - Star distribution

**Data Calculation:**

```javascript
// Backend - reviewController.js - getStatistics()

// Query 1: Per-product stats (using VIEW)
SELECT * FROM review_statistics;

// Query 2: Overall stats (aggregated)
SELECT
  COUNT(DISTINCT product_id) as total_products,
  COUNT(*) as total_reviews,
  AVG(rating) as overall_average_rating,
  SUM(CASE WHEN rating = 5...) as total_five_star,
  ...
FROM reviews;
```

---

### ✨ Feature 4: Auto-Fetch External Reviews

**Chức năng:**

- Button để trigger fetch
- Loading state indicator
- Success/Error messages
- Auto-refresh data sau khi fetch

**Flow:**

1. User clicks "🔄 Fetch Reviews"
2. Show loading message
3. Backend simulates external API call
4. Generate 2 random reviews
5. Insert to database
6. Return new reviews
7. Frontend reloads all data
8. Show success message
9. Auto-hide message after 3s

**Simulation Logic:**

```javascript
// Backend - fetchReviews()
const externalReviews = [
  {
    product_id: Math.floor(Math.random() * 4) + 1,
    user_name: `User_${Date.now()}`,
    rating: Math.floor(Math.random() * 5) + 1,
    comment: "Review from external source",
  },
  // ... second review
];

// Insert each review to database
// Return array of inserted reviews
```

**Real Integration Examples:**

- Google My Business API
- Facebook Reviews API
- Yelp Fusion API
- Amazon Product Advertising API
- Custom web scraping

---

### ✨ Feature 5: Real-time Updates

**Mechanism:**

- Mỗi action (add review, fetch reviews) trigger `loadInitialData()`
- Parallel API calls với `Promise.all()`
- Update tất cả components cùng lúc

```javascript
// App.jsx - loadInitialData()
const [reviewsData, productsData, statsData] = await Promise.all([
  api.getAllReviews(),
  api.getAllProducts(),
  api.getStatistics(),
]);

setReviews(reviewsData);
setProducts(productsData);
setStatistics(statsData);

// All components re-render with new data
```

**Benefits:**

- ✅ Consistent data across all components
- ✅ Fast updates (parallel requests)
- ✅ No stale data

---

## 9. Bảo Mật & Best Practices

### 🔒 Security Measures

#### 1. SQL Injection Prevention

```javascript
// ❌ BAD - Vulnerable to SQL injection:
db.query(`SELECT * FROM products WHERE id = ${req.params.id}`);

// ✅ GOOD - Using parameterized queries:
db.query("SELECT * FROM products WHERE id = ?", [req.params.id]);

// All queries trong project sử dụng parameterized queries
// Example từ reviewController.js:
await db.query(
  "INSERT INTO reviews (product_id, user_name, rating, comment) VALUES (?, ?, ?, ?)",
  [product_id, user_name, rating, comment]
);
```

#### 2. CORS Configuration

```javascript
// server.js - CORS setup
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Chỉ cho phép requests từ frontend domain
// Block requests từ domains khác
```

#### 3. Input Validation

```javascript
// Backend validation example
if (!product_id || !user_name || !rating) {
  return res.status(400).json({
    success: false,
    message: "Missing required fields",
  });
}

if (rating < 1 || rating > 5) {
  return res.status(400).json({
    success: false,
    message: "Invalid rating",
  });
}

// Database level validation
// CHECK constraint in schema: rating >= 1 AND rating <= 5
```

#### 4. Environment Variables

```bash
# .env file - NEVER commit to Git!
DB_PASSWORD=your_secret_password
DB_HOST=localhost

# .gitignore includes:
.env
node_modules/
```

#### 5. Error Handling

```javascript
// Don't expose detailed errors in production
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err);
  res.status(500).json({
    success: false,
    message: "Server error",
    error:
      process.env.NODE_ENV === "development"
        ? err.message
        : "Internal Server Error", // Generic message in production
  });
});
```

### 🎯 Best Practices Implemented

#### 1. Database Connection Pooling

```javascript
// config/database.js
const pool = mysql.createPool({
  connectionLimit: 10, // Max 10 concurrent connections
  waitForConnections: true,
  queueLimit: 0,
});

// Benefits:
// ✅ Reuse connections (better performance)
// ✅ Handle concurrent requests efficiently
// ✅ Auto-reconnect on failure
```

#### 2. Async/Await Pattern

```javascript
// Clean async code (no callback hell)
exports.getAllProducts = async (req, res) => {
  try {
    const [products] = await db.query("SELECT * FROM products");
    res.json({ success: true, data: products });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
```

#### 3. RESTful API Design

```
✅ Proper HTTP methods:
   - GET: Retrieve data
   - POST: Create new resource
   - PUT: Update resource (not yet implemented)
   - DELETE: Remove resource (not yet implemented)

✅ Meaningful URLs:
   - /api/products (not /api/getProducts)
   - /api/reviews/product/:id (not /api/getReviewsByProductId)

✅ Consistent response format:
   { success: true/false, data: {...}, message: "..." }

✅ Proper status codes:
   - 200: OK
   - 201: Created
   - 400: Bad Request
   - 404: Not Found
   - 500: Server Error
```

#### 4. Database Indexing

```sql
-- Indexes for performance optimization
INDEX idx_product_id (product_id)  -- Fast joins and filters
INDEX idx_rating (rating)          -- Fast statistics queries
INDEX idx_created_at (created_at)  -- Fast sorting by date

-- Foreign key with cascade delete
FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
```

#### 5. Component Reusability

```jsx
// Reusable components với props
<Statistics data={statistics} loading={loading} />
<ProductList products={products} loading={loading} />
<ReviewList reviews={reviews} loading={loading} />

// Each component handles its own rendering logic
// Easy to test và maintain
```

#### 6. Separation of Concerns

```
Backend:
├─ Routes → Define endpoints
├─ Controllers → Business logic
└─ Database → Data access

Frontend:
├─ Components → UI rendering
├─ Services → API communication
└─ App → State management
```

---

## 10. Troubleshooting

### ❓ Common Issues & Solutions

#### Issue 1: Backend không khởi động được

**Symptoms:**

```
Error: Cannot find module 'express'
```

**Solution:**

```bash
cd backend
npm install
npm start
```

---

#### Issue 2: MySQL connection failed

**Symptoms:**

```
❌ MySQL connection error: ER_ACCESS_DENIED_ERROR
```

**Solution:**

1. Kiểm tra .env file:

   ```env
   DB_USER=root
   DB_PASSWORD=your_password  # ← Đảm bảo đúng password
   DB_NAME=reviews_db
   ```

2. Test MySQL connection:

   ```bash
   mysql -u root -p
   # Enter password
   SHOW DATABASES;
   # Should see reviews_db
   ```

3. Grant privileges nếu cần:
   ```sql
   GRANT ALL PRIVILEGES ON reviews_db.* TO 'root'@'localhost';
   FLUSH PRIVILEGES;
   ```

---

#### Issue 3: Database not found

**Symptoms:**

```
Error: ER_BAD_DB_ERROR: Unknown database 'reviews_db'
```

**Solution:**

```bash
mysql -u root -p
source backend/database/schema.sql
# Or
mysql -u root -p < backend/database/schema.sql
```

---

#### Issue 4: CORS error trên frontend

**Symptoms:**

```
Access to XMLHttpRequest blocked by CORS policy
```

**Solution:**

1. Check FRONTEND_URL trong backend/.env:

   ```env
   FRONTEND_URL=http://localhost:5173
   ```

2. Restart backend server:

   ```bash
   cd backend
   npm run dev
   ```

3. Verify CORS middleware trong server.js

---

#### Issue 5: Port already in use

**Symptoms:**

```
Error: EADDRINUSE: address already in use :::4000
```

**Solution:**

**Windows:**

```bash
netstat -ano | findstr :4000
taskkill /PID <PID_NUMBER> /F
```

**Mac/Linux:**

```bash
lsof -ti:4000 | xargs kill -9
# Or change port in .env
PORT=4001
```

---

#### Issue 6: Frontend không connect được backend

**Symptoms:**

```
Network Error: timeout of 10000ms exceeded
```

**Solution:**

1. Check backend đang chạy:

   ```bash
   curl http://localhost:4000/health
   # Should return: {"status":"OK"}
   ```

2. Check API_BASE_URL trong frontend:

   ```javascript
   // frontend/src/services/api.js
   const API_BASE_URL = "http://localhost:4000/api";
   ```

3. Disable firewall tạm thời để test

---

#### Issue 7: Reviews không hiển thị

**Symptoms:**

- Statistics shows 0 reviews
- Review list is empty

**Solution:**

1. Check data trong database:

   ```sql
   USE reviews_db;
   SELECT * FROM reviews;
   SELECT * FROM products;
   ```

2. Nếu empty, re-run schema.sql để insert sample data

3. Check browser console for errors (F12)

---

#### Issue 8: Module not found (frontend)

**Symptoms:**

```
Error: Cannot find module 'axios'
```

**Solution:**

```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
npm run dev
```

---

### 🛠️ Debug Tips

#### Enable Detailed Logging

**Backend:**

```javascript
// server.js - already has logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  console.log("Body:", req.body); // Add this for debugging
  next();
});
```

**Frontend:**

```javascript
// api.js - log all requests
apiClient.interceptors.request.use((config) => {
  console.log("API Request:", config.method.toUpperCase(), config.url);
  console.log("Data:", config.data);
  return config;
});
```

#### Check Database Queries

```javascript
// controllers/reviewController.js - add logging
const [products] = await db.query("SELECT * FROM products");
console.log("Query result:", products); // Debug line
```

#### Browser DevTools

```
F12 → Console Tab:
- Check for JavaScript errors
- View API request/response

F12 → Network Tab:
- Check HTTP status codes
- View request/response headers
- Check response data
```

---

## 📞 Support & Contact

### 📚 Additional Resources

- **React Documentation**: https://react.dev/
- **Express.js Guide**: https://expressjs.com/
- **MySQL Documentation**: https://dev.mysql.com/doc/
- **Vite Documentation**: https://vitejs.dev/

### 🤝 Contributing

Để contribute vào project:

1. Fork repository
2. Create feature branch: `git checkout -b feature/AmazingFeature`
3. Commit changes: `git commit -m 'Add some AmazingFeature'`
4. Push to branch: `git push origin feature/AmazingFeature`
5. Open Pull Request

### 📋 Future Enhancements

Các tính năng có thể phát triển thêm:

- [ ] **Authentication & Authorization** (JWT tokens)
- [ ] **Admin Dashboard** (manage products, delete reviews)
- [ ] **Review Moderation** (approve/reject reviews)
- [ ] **Image Upload** (user can upload product images)
- [ ] **Search & Filter** (search products, filter by rating)
- [ ] **Pagination** (for large datasets)
- [ ] **Real-time Notifications** (WebSocket)
- [ ] **Email Notifications** (new review alerts)
- [ ] **Export Reports** (PDF, Excel)
- [ ] **Multi-language Support** (i18n)
- [ ] **Dark Mode** (theme toggle)
- [ ] **Mobile App** (React Native)
- [ ] **API Rate Limiting** (prevent abuse)
- [ ] **Caching Layer** (Redis for better performance)
- [ ] **CI/CD Pipeline** (automated deployment)

---

## 📝 Changelog

### Version 1.0.0 (Current)

**Features:**

- ✅ Product management
- ✅ Review CRUD operations
- ✅ Statistics dashboard
- ✅ Auto-fetch external reviews
- ✅ Responsive UI
- ✅ Real-time updates

**Technical:**

- React 18.2.0
- Express.js 4.18.2
- MySQL 8.0+
- Vite 5.0.8

---

## 📄 License

MIT License - Free to use for personal and commercial projects

---

## 🙏 Acknowledgments

- **Unsplash** for product images
- **React Team** for amazing UI library
- **Express.js Team** for robust backend framework
- **MySQL Team** for reliable database system

---

<div align="center">

**📚 END OF DOCUMENTATION 📚**

---

_Document created with ❤️ for developers_

_Last Updated: October 23, 2025_

</div>
