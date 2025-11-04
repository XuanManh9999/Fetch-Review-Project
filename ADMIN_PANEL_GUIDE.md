# 🔐 Admin Panel Guide

## Tổng Quan

Hệ thống Admin Panel cung cấp đầy đủ tính năng quản lý người dùng và sản phẩm với:
- ✅ CRUD operations (Create, Read, Update, Delete)
- ✅ Tìm kiếm và lọc dữ liệu
- ✅ Phân trang (Pagination)
- ✅ Thống kê tổng quan
- ✅ Bảo mật với role-based access control

---

## 🚀 Truy Cập Admin Panel

### Yêu Cầu:
1. **Đăng nhập** với tài khoản có role = `admin`
2. Sau khi đăng nhập, button **"🔐 Admin"** sẽ xuất hiện ở header
3. Click vào button để vào Admin Dashboard

### URL:
- **Admin Dashboard:** `/admin` (chỉ truy cập được khi đã login và có role admin)

---

## 📊 Admin Dashboard

### 1. Statistics Overview
Hiển thị thống kê tổng quan:
- **Users:** Tổng số users, admins, verified users
- **Products:** Tổng số products, active, out of stock
- **Reviews:** Tổng số reviews, average rating
- **Recent Activity:** Số lượng mới trong 7 ngày qua

### 2. Navigation Tabs
- **📊 Dashboard:** Xem thống kê tổng quan
- **👥 Users Management:** Quản lý người dùng
- **📦 Products Management:** Quản lý sản phẩm

---

## 👥 Users Management

### Tính Năng:

#### 1. **Xem danh sách users**
- Hiển thị: ID, Email, Full Name, Role, Verified Status, Created At
- Phân trang: 10 users/page (có thể điều chỉnh)
- Sắp xếp: Theo thời gian tạo mới nhất

#### 2. **Tìm kiếm và lọc**
- **Search:** Tìm theo email hoặc tên
- **Filter by Role:** Lọc theo `user` hoặc `admin`
- Kết hợp search và filter được

#### 3. **CRUD Operations**

**Create User:**
- Click "➕ Add New User"
- Điền thông tin:
  - Email * (required)
  - Full Name * (required)
  - Password * (required, min 6 chars)
  - Role (user/admin)
  - Email Verified (checkbox)

**Edit User:**
- Click "✏️ Edit" trên user row
- Có thể cập nhật:
  - Full Name
  - Role
  - Email Verified status
  - **Lưu ý:** Email không thể sửa sau khi tạo

**Delete User:**
- Click "🗑️ Delete" trên user row
- Xác nhận trước khi xóa
- **Lưu ý:** Không thể xóa chính mình

#### 4. **Pagination**
- Previous/Next buttons
- Hiển thị: "Page X of Y (Z total)"
- Tự động cập nhật khi search/filter

---

## 📦 Products Management

### Tính Năng:

#### 1. **Xem danh sách products**
- Hiển thị: ID, Image, Name, Price, Category, Brand, Stock, Status, Created At
- Phân trang: 10 products/page
- Hiển thị thumbnail ảnh sản phẩm

#### 2. **Tìm kiếm và lọc**
- **Search:** Tìm theo tên hoặc mô tả
- **Filter by Category:** Lọc theo danh mục
- **Filter by Brand:** Lọc theo thương hiệu
- **Filter by Status:** Active, Inactive, Out of Stock
- Kết hợp nhiều filters được

#### 3. **CRUD Operations**

**Create Product:**
- Click "➕ Add New Product"
- Điền thông tin:
  - Product Name * (required)
  - SKU (optional, unique)
  - Description
  - Image URL
  - Price * (required)
  - Original Price (optional, để tính % giảm giá)
  - Category
  - Brand
  - Stock (number)
  - Warranty
  - Specifications (text, comma-separated)
  - Status (active/inactive/out_of_stock)

**Edit Product:**
- Click "✏️ Edit" trên product row
- Có thể cập nhật tất cả fields
- **Lưu ý:** SKU phải unique nếu có

**Delete Product:**
- Click "🗑️ Delete" trên product row
- Xác nhận trước khi xóa
- **Lưu ý:** Sẽ xóa cả các reviews liên quan (CASCADE)

#### 4. **Pagination**
- Tương tự như Users Management
- Tự động cập nhật khi search/filter

---

## 🔒 Security

### Backend Protection:
1. **Authentication Required:** Tất cả routes `/api/admin/*` yêu cầu JWT token
2. **Admin Role Required:** Middleware `isAdmin` kiểm tra role = 'admin'
3. **Validation:** Input validation cho tất cả operations

### Frontend Protection:
1. **Role Check:** Chỉ hiển thị Admin button khi user.role === 'admin'
2. **Route Guard:** Kiểm tra authentication và role trước khi hiển thị dashboard
3. **Auto Redirect:** Nếu không đủ quyền, tự động redirect về home

---

## 📡 API Endpoints

### Users Management:
```
GET    /api/admin/users              - Get all users (with pagination, search, filter)
GET    /api/admin/users/:userId      - Get user by ID
POST   /api/admin/users              - Create new user
PUT    /api/admin/users/:userId      - Update user
DELETE /api/admin/users/:userId      - Delete user
PUT    /api/admin/users/:userId/password - Update user password
```

### Products Management:
```
GET    /api/admin/products           - Get all products (with pagination, search, filters)
GET    /api/admin/products/filters   - Get available categories and brands
GET    /api/admin/products/:productId - Get product by ID
POST   /api/admin/products           - Create new product
PUT    /api/admin/products/:productId - Update product
DELETE /api/admin/products/:productId - Delete product
```

### Statistics:
```
GET    /api/admin/statistics         - Get admin dashboard statistics
```

**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)
- `search`: Search term (for users: email/name, for products: name/description)
- `role`: Filter by role (users only)
- `category`: Filter by category (products only)
- `brand`: Filter by brand (products only)
- `status`: Filter by status (products only)

---

## 🎨 UI Features

### Responsive Design:
- Mobile-friendly
- Adaptive layouts
- Touch-friendly buttons

### User Experience:
- Loading states
- Error messages
- Success notifications
- Confirmation dialogs
- Modal forms
- Real-time search

### Visual Indicators:
- Badges for roles and status
- Color-coded stock levels
- Product thumbnails
- Statistics cards with gradients

---

## 🧪 Testing

### Test Admin Panel:

1. **Tạo Admin User:**
   ```sql
   INSERT INTO users (email, password, full_name, role) 
   VALUES ('admin@example.com', '$2b$10$...', 'Admin User', 'admin');
   ```

2. **Login với admin account**

3. **Test các tính năng:**
   - ✅ Xem statistics
   - ✅ Tạo/Sửa/Xóa user
   - ✅ Tìm kiếm và lọc users
   - ✅ Phân trang users
   - ✅ Tạo/Sửa/Xóa product
   - ✅ Tìm kiếm và lọc products
   - ✅ Phân trang products

---

## 📝 Notes

1. **Password Reset:** Admin có thể tạo user mới, nhưng không thể reset password của user hiện tại (cần dùng forgot password flow)

2. **Cascade Delete:** 
   - Xóa user → Xóa reviews của user đó
   - Xóa product → Xóa tất cả reviews của product đó

3. **SKU Uniqueness:** SKU phải unique nếu được cung cấp

4. **Email Uniqueness:** Email phải unique khi tạo user mới

5. **Self-Protection:** Admin không thể xóa chính mình

---

## 🎉 Hoàn Thành!

Admin Panel đã sẵn sàng với đầy đủ tính năng:
- ✅ CRUD cho Users và Products
- ✅ Tìm kiếm và Lọc
- ✅ Phân trang
- ✅ Thống kê
- ✅ Bảo mật
- ✅ Responsive UI

Hãy đăng nhập với tài khoản admin và khám phá!

