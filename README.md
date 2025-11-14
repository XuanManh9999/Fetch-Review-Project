# 🌟 TechHive

## 📋 Tổng Quan

**TechHive** là một ứng dụng web full-stack hoàn chỉnh để quản lý đánh giá sản phẩm với các tính năng:

- ✅ **Quản lý sản phẩm và đánh giá** - CRUD operations đầy đủ
- ✅ **Hệ thống xác thực người dùng** - Đăng ký, đăng nhập, quên mật khẩu
- ✅ **Admin Panel** - Quản lý users và products với role-based access
- ✅ **Thống kê và phân tích** - Dashboard với charts và statistics
- ✅ **Tích hợp API bên ngoài** - Fetch reviews từ Amazon, FakeStore API
- ✅ **UI/UX hiện đại** - Responsive design với React

---

## 🚀 Công Nghệ Sử Dụng

### Backend

- **Node.js** + **Express.js** - RESTful API server
- **MySQL** - Database management
- **JWT** - Authentication & Authorization
- **bcryptjs** - Pa
- **Axios** - HTTP client cho external APIs
- **Nodemailer** - Email service (password reset)

### Frontend

- **React 18** - UI framework
- **Vite** - Build tool và dev server
- **Axios** - API client
- **Recharts** - Data visualization
- **CSS3** - Styling với responsive design

---

## 📦 Cấu Trúc Dự Án

```
WebFullStack/
├── backend/                 # Backend API Server
│   ├── config/             # Database configuration
│   ├── controllers/        # Business logic
│   │   ├── authController.js
│   │   ├── reviewController.js
│   │   └── adminController.js
│   ├── routes/             # API routes
│   ├── middleware/         # Auth middleware
│   ├── database/           # SQL schemas
│   └── server.js           # Entry point
│
├── frontend/               # React Frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── admin/      # Admin panel components
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── ProductList.jsx
│   │   │   ├── ReviewList.jsx
│   │   │   └── ...
│   │   ├── context/        # React Context (Auth)
│   │   ├── services/       # API services
│   │   └── App.jsx         # Main component
│   └── vite.config.js
│
└── Documentation/          # Project documentation
```

---

## ✨ Các Chức Năng Chính

### 1. 🔐 Hệ Thống Xác Thực (Authentication)

#### Đăng Ký (Register)

- Tạo tài khoản mới với email và password
- Validation đầy đủ (email format, password strength)
- Hash password với bcryptjs
- Email verification support

#### Đăng Nhập (Login)

- JWT-based authentication
- Token lưu trong localStorage
- Auto-redirect sau khi login
- Remember me functionality

#### Quên Mật Khẩu (Forgot Password)

- Gửi reset token qua email
- Secure token generation với crypto
- Token expiration (1 hour)
- Reset password với token validation

#### Đăng Xuất (Logout)

- Clear JWT token
- Redirect về home page

**API Endpoints:**

```
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/forgot-password
POST   /api/auth/reset-password
POST   /api/auth/logout
```

---

### 2. 📦 Quản Lý Sản Phẩm (Products Management)

#### Xem Danh Sách Sản Phẩm

- Hiển thị tất cả products với pagination
- Product details: name, price, image, category, brand, stock
- Click để xem chi tiết
- Responsive grid layout

#### Xem Chi Tiết Sản Phẩm

- Full product information
- Product image gallery
- Specifications
- Related reviews
- Add to cart functionality (UI ready)

#### Tìm Kiếm và Lọc

- Search by product name
- Filter by category
- Filter by brand
- Filter by price range

**API Endpoints:**

```
GET    /api/products              # Get all products
GET    /api/products/:id          # Get product by ID
GET    /api/products?search=...  # Search products
```

---

### 3. ⭐ Quản Lý Đánh Giá (Reviews Management)

#### Xem Đánh Giá

- Hiển thị tất cả reviews với pagination
- Review details: user name, rating (1-5 stars), comment, date
- Product association
- Sort by date, rating

#### Thêm Đánh Giá Mới

- Chọn sản phẩm từ dropdown
- Rating từ 1-5 sao
- Viết comment
- Validation đầy đủ
- Yêu cầu đăng nhập

#### Fetch Reviews từ External APIs

- **FakeStore API** - Free, reliable, unlimited
- **RapidAPI (Amazon)** - Real Amazon reviews (cần API key)
- **Mock Data** - Fallback khi API không hoạt động
- Auto-retry mechanism cho 503 errors
- Graceful fallback

**API Endpoints:**

```
GET    /api/reviews                    # Get all reviews
GET    /api/reviews/product/:id       # Get reviews by product
POST   /api/reviews                   # Create new review
POST   /api/fetch-reviews             # Fetch from external APIs
GET    /api/reviews/statistics        # Get review statistics
```

---

### 4. 📊 Thống Kê và Phân Tích (Statistics Dashboard)

#### Overall Statistics

- **Total Products** - Tổng số sản phẩm
- **Total Reviews** - Tổng số đánh giá
- **Average Rating** - Điểm đánh giá trung bình
- **Recent Activity** - Hoạt động gần đây

#### Charts và Visualizations

- Rating distribution chart
- Reviews over time
- Product popularity
- Category statistics

**API Endpoints:**

```
GET    /api/statistics                # Get overall statistics
```

---

### 5. 👥 Admin Panel

#### Quản Lý Người Dùng (Users Management)

- **View Users** - Xem danh sách users với pagination
- **Create User** - Tạo user mới (admin only)
- **Edit User** - Cập nhật thông tin user
- **Delete User** - Xóa user (không thể xóa chính mình)
- **Search & Filter** - Tìm kiếm theo email/name, lọc theo role
- **Role Management** - Phân quyền user/admin

#### Quản Lý Sản Phẩm (Products Management)

- **View Products** - Xem danh sách products với pagination
- **Create Product** - Thêm sản phẩm mới
- **Edit Product** - Cập nhật thông tin sản phẩm
- **Delete Product** - Xóa sản phẩm (cascade delete reviews)
- **Search & Filter** - Tìm kiếm, lọc theo category, brand, status
- **Stock Management** - Quản lý tồn kho

#### Admin Statistics

- **Users Statistics** - Tổng users, admins, verified users
- **Products Statistics** - Tổng products, active, out of stock
- **Reviews Statistics** - Tổng reviews, average rating
- **Recent Activity** - Số lượng mới trong 7 ngày qua

**API Endpoints:**

```
# Users
GET    /api/admin/users
GET    /api/admin/users/:id
POST   /api/admin/users
PUT    /api/admin/users/:id
DELETE /api/admin/users/:id

# Products
GET    /api/admin/products
GET    /api/admin/products/:id
POST   /api/admin/products
PUT    /api/admin/products/:id
DELETE /api/admin/products/:id

# Statistics
GET    /api/admin/statistics
```

**Security:**

- JWT authentication required
- Admin role verification
- Input validation
- SQL injection protection

---

### 6. 🌐 Tích Hợp External APIs

#### FakeStore API Integration

- Fetch products từ FakeStore API
- Generate reviews dựa trên ratings
- Map reviews vào products trong database
- Free, unlimited requests
- 99.9% uptime

#### RapidAPI (Amazon) Integration

- Fetch real reviews từ Amazon
- Support multiple ASINs
- Auto-retry mechanism (3 retries)
- Exponential backoff
- Graceful fallback

#### Configuration

```env
# FakeStore API (Recommended)
USE_FAKESTORE_API=true
USE_REAL_API=false

# RapidAPI (Amazon)
USE_FAKESTORE_API=false
USE_REAL_API=true
RAPIDAPI_KEY=your_key_here
RAPIDAPI_HOST=real-time-amazon-data.p.rapidapi.com
```

---

## 🛠️ Cài Đặt và Chạy

### Prerequisites

- **Node.js** >= 16.x
- **MySQL** >= 8.0
- **npm** hoặc **yarn**

### Bước 1: Clone Repository

```bash
git clone <repository-url>
cd WebFullStack
```

### Bước 2: Setup Backend

```bash
cd backend

# Install dependencies
npm install

# Tạo file .env
cp ENV_RAPIDAPI.example .env

# Cấu hình .env
# - DB_HOST, DB_USER, DB_PASSWORD, DB_NAME
# - JWT_SECRET
# - RAPIDAPI_KEY (optional)
# - USE_FAKESTORE_API=true (recommended)

# Tạo database
mysql -u root -p < database/schema.sql

# Chạy migrations (nếu có)
mysql -u root -p < database/migration_add_product_fields.sql

# Start server
npm run dev
```

Backend sẽ chạy tại: `http://localhost:4000`

### Bước 3: Setup Frontend

```bash
cd frontend

# Install dependencies
npm install

# Start dev server
npm run dev
```

Frontend sẽ chạy tại: `http://localhost:5173`

---

## 🔧 Cấu Hình

### Backend Configuration (`.env`)

```env
# Server
PORT=4000
NODE_ENV=development

# Database
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=reviews_db
DB_PORT=3306

# JWT
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d

# CORS
FRONTEND_URL=http://localhost:5173

# External APIs
USE_FAKESTORE_API=true
USE_REAL_API=false
RAPIDAPI_KEY=your_key_here
RAPIDAPI_HOST=real-time-amazon-data.p.rapidapi.com
```

### Frontend Configuration

Frontend tự động kết nối với backend tại `http://localhost:4000`

---

## 📡 API Documentation

### Authentication Endpoints

| Method | Endpoint                    | Description              | Auth Required |
| ------ | --------------------------- | ------------------------ | ------------- |
| POST   | `/api/auth/register`        | Đăng ký user mới         | ❌            |
| POST   | `/api/auth/login`           | Đăng nhập                | ❌            |
| POST   | `/api/auth/forgot-password` | Gửi reset password email | ❌            |
| POST   | `/api/auth/reset-password`  | Reset password với token | ❌            |
| POST   | `/api/auth/logout`          | Đăng xuất                | ✅            |

### Products Endpoints

| Method | Endpoint                   | Description         | Auth Required |
| ------ | -------------------------- | ------------------- | ------------- |
| GET    | `/api/products`            | Lấy tất cả products | ❌            |
| GET    | `/api/products/:id`        | Lấy product theo ID | ❌            |
| GET    | `/api/products?search=...` | Tìm kiếm products   | ❌            |

### Reviews Endpoints

| Method | Endpoint                   | Description              | Auth Required |
| ------ | -------------------------- | ------------------------ | ------------- |
| GET    | `/api/reviews`             | Lấy tất cả reviews       | ❌            |
| GET    | `/api/reviews/product/:id` | Lấy reviews theo product | ❌            |
| POST   | `/api/reviews`             | Tạo review mới           | ✅            |
| POST   | `/api/fetch-reviews`       | Fetch từ external APIs   | ❌            |
| GET    | `/api/reviews/statistics`  | Lấy statistics           | ❌            |

### Admin Endpoints

| Method | Endpoint                  | Description         | Auth Required |
| ------ | ------------------------- | ------------------- | ------------- |
| GET    | `/api/admin/users`        | Lấy tất cả users    | ✅ Admin      |
| POST   | `/api/admin/users`        | Tạo user mới        | ✅ Admin      |
| PUT    | `/api/admin/users/:id`    | Cập nhật user       | ✅ Admin      |
| DELETE | `/api/admin/users/:id`    | Xóa user            | ✅ Admin      |
| GET    | `/api/admin/products`     | Lấy tất cả products | ✅ Admin      |
| POST   | `/api/admin/products`     | Tạo product mới     | ✅ Admin      |
| PUT    | `/api/admin/products/:id` | Cập nhật product    | ✅ Admin      |
| DELETE | `/api/admin/products/:id` | Xóa product         | ✅ Admin      |
| GET    | `/api/admin/statistics`   | Admin statistics    | ✅ Admin      |

---

## 🗄️ Database Schema

### Users Table

```sql
- id (INT, PRIMARY KEY, AUTO_INCREMENT)
- email (VARCHAR, UNIQUE)
- password (VARCHAR, HASHED)
- full_name (VARCHAR)
- role (ENUM: 'user', 'admin')
- email_verified (BOOLEAN)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### Products Table

```sql
- id (INT, PRIMARY KEY, AUTO_INCREMENT)
- name (VARCHAR)
- sku (VARCHAR, UNIQUE, NULLABLE)
- description (TEXT)
- image_url (VARCHAR)
- price (DECIMAL)
- original_price (DECIMAL, NULLABLE)
- category (VARCHAR)
- brand (VARCHAR)
- stock (INT)
- warranty (VARCHAR, NULLABLE)
- specifications (TEXT, NULLABLE)
- status (ENUM: 'active', 'inactive', 'out_of_stock')
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### Reviews Table

```sql
- id (INT, PRIMARY KEY, AUTO_INCREMENT)
- product_id (INT, FOREIGN KEY)
- user_id (INT, FOREIGN KEY, NULLABLE)
- user_name (VARCHAR)
- rating (INT, 1-5)
- comment (TEXT)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

---

## 🔒 Security Features

### Authentication & Authorization

- JWT-based authentication
- Password hashing với bcryptjs
- Role-based access control (RBAC)
- Token expiration
- Secure password reset flow

### Data Protection

- SQL injection protection (parameterized queries)
- XSS protection
- CORS configuration
- Input validation
- Error handling không expose sensitive info

### API Security

- Protected routes với middleware
- Admin-only endpoints
- Rate limiting ready
- Request validation

---

## 🎨 UI/UX Features

### Responsive Design

- Mobile-friendly layout
- Adaptive components
- Touch-friendly buttons
- Responsive tables và forms

### User Experience

- Loading states
- Error messages rõ ràng
- Success notifications
- Confirmation dialogs
- Real-time search
- Smooth transitions

### Visual Indicators

- Badges cho roles và status
- Color-coded ratings
- Product thumbnails
- Statistics cards với gradients
- Icons cho actions

---

## 🧪 Testing

### Manual Testing Checklist

#### Authentication

- [ ] Register new user
- [ ] Login với valid credentials
- [ ] Login với invalid credentials
- [ ] Forgot password flow
- [ ] Reset password với valid token
- [ ] Reset password với expired token
- [ ] Logout functionality

#### Products

- [ ] View products list
- [ ] View product details
- [ ] Search products
- [ ] Filter products

#### Reviews

- [ ] View reviews list
- [ ] Add new review (authenticated)
- [ ] Add review without login (should redirect)
- [ ] Fetch reviews from FakeStore API
- [ ] Fetch reviews from RapidAPI (if configured)
- [ ] View statistics

#### Admin Panel

- [ ] Access admin panel (admin only)
- [ ] View users list
- [ ] Create/Edit/Delete user
- [ ] View products list
- [ ] Create/Edit/Delete product
- [ ] View admin statistics

---

## 📚 Documentation Files

- **README.md** - File này (tổng quan project)
- **LLM_Usage.md** - Hướng dẫn sử dụng LLM trong project
- **FAKESTORE_SETUP.md** - Setup FakeStore API
- **RAPIDAPI_SETUP_GUIDE.md** - Setup RapidAPI
- **RAPIDAPI_README.md** - RapidAPI documentation index
- **ENV_CONFIGURATION.md** - Environment variables guide

---

## 🚀 Deployment

### Backend Deployment

1. Set `NODE_ENV=production`
2. Update database credentials
3. Set secure JWT_SECRET
4. Configure CORS với production frontend URL
5. Use process manager (PM2, Forever)
6. Setup reverse proxy (Nginx)

### Frontend Deployment

1. Build production: `npm run build`
2. Deploy `dist/` folder
3. Configure API base URL
4. Setup HTTPS
5. Configure CORS trên backend

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## 📝 License

This project is licensed under the ISC License.

---

## 👨‍💻 Author

**Your Name**

- Email: your.email@example.com
- GitHub: [@yourusername](https://github.com/yourusername)

---

## 🙏 Acknowledgments

- FakeStore API - https://fakestoreapi.com/
- RapidAPI - https://rapidapi.com/
- React Community
- Express.js Team

---

## 📞 Support

Nếu gặp vấn đề:

1. Check documentation files
2. Review error logs
3. Check GitHub Issues
4. Contact maintainer

---

**Happy Coding! 🚀**

_Last Updated: November 2025_
- CSDL -> Thiết kế csdl -> nam, toàn, đức (phân tích và làm)
- Front-end -> toàn, đức thiết kế giao diện
- Backend-end -> Nam làm backend