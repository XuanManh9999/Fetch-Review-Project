# 🔐 Hướng Dẫn Cài Đặt Authentication System

## 📋 Tổng Quan

Hệ thống đã được tích hợp đầy đủ các chức năng:

- ✅ Đăng ký (Register)
- ✅ Đăng nhập (Login)
- ✅ Đăng xuất (Logout)
- ✅ Quên mật khẩu (Forgot Password)
- ✅ Đặt lại mật khẩu (Reset Password)
- ✅ JWT Token Authentication
- ✅ Password Hashing với bcrypt

---

## 🚀 Cài Đặt

### Bước 1: Cài Đặt Dependencies

```bash
cd backend
npm install
```

Các packages mới được thêm:

- `bcryptjs` - Hash passwords
- `jsonwebtoken` - JWT tokens
- `nodemailer` - Gửi email (for password reset)

### Bước 2: Cập Nhật Database

Chạy lại file schema để tạo các bảng mới:

```bash
mysql -u root -p < backend/database/schema.sql
```

Hoặc trong MySQL Workbench:

```sql
source backend/database/schema.sql
```

**Các bảng mới được tạo:**

- `users` - Lưu thông tin người dùng
- `password_reset_tokens` - Lưu tokens để reset password

### Bước 3: Cấu Hình Environment Variables

Thêm vào file `backend/.env`:

```env
# ===================================
# JWT CONFIGURATION
# ===================================
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=7d

# ===================================
# EMAIL CONFIGURATION (Optional)
# ===================================
# For production, configure real email service
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_FROM=noreply@yourapp.com
```

**⚠️ Lưu ý:**

- `JWT_SECRET`: Nên dùng một chuỗi ngẫu nhiên mạnh (ít nhất 32 ký tự)
- `EMAIL_*`: Trong development, email sẽ được log ra console. Để gửi email thật, cấu hình SMTP.

---

## 📚 API Endpoints

### Authentication Endpoints

| Method | Endpoint                    | Description                 | Auth Required |
| ------ | --------------------------- | --------------------------- | ------------- |
| POST   | `/api/auth/register`        | Đăng ký tài khoản mới       | ❌            |
| POST   | `/api/auth/login`           | Đăng nhập                   | ❌            |
| GET    | `/api/auth/me`              | Lấy thông tin user hiện tại | ✅            |
| POST   | `/api/auth/forgot-password` | Gửi email reset password    | ❌            |
| POST   | `/api/auth/reset-password`  | Đặt lại mật khẩu với token  | ❌            |
| POST   | `/api/auth/change-password` | Đổi mật khẩu (khi đã login) | ✅            |

### Request/Response Examples

#### Register

```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "full_name": "John Doe"
}
```

**Response:**

```json
{
  "success": true,
  "message": "User registered successfully!",
  "data": {
    "user": {
      "id": 1,
      "email": "user@example.com",
      "full_name": "John Doe",
      "role": "user",
      "created_at": "2025-01-20T10:00:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### Login

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Login successful!",
  "data": {
    "user": {
      "id": 1,
      "email": "user@example.com",
      "full_name": "John Doe",
      "role": "user"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### Forgot Password

```http
POST /api/auth/forgot-password
Content-Type: application/json

{
  "email": "user@example.com"
}
```

**Response:**

```json
{
  "success": true,
  "message": "If email exists, password reset link has been sent to your email"
}
```

#### Reset Password

```http
POST /api/auth/reset-password
Content-Type: application/json

{
  "token": "reset-token-from-email",
  "newPassword": "newpassword123"
}
```

#### Protected Routes - Sử dụng Token

```http
GET /api/auth/me
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 🎨 Frontend Usage

### Components

- `Login.jsx` - Form đăng nhập
- `Register.jsx` - Form đăng ký
- `ForgotPassword.jsx` - Form quên mật khẩu
- `ResetPassword.jsx` - Form đặt lại mật khẩu

### AuthContext

Sử dụng `useAuth()` hook trong components:

```jsx
import { useAuth } from "../context/AuthContext";

function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuth();

  if (!isAuthenticated) {
    return <div>Please login</div>;
  }

  return (
    <div>
      <p>Welcome, {user.full_name}!</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

### API Service

Token được tự động thêm vào headers khi gọi API:

```javascript
import api from "./services/api";

// Token sẽ tự động được thêm vào request
const reviews = await api.getAllReviews();
```

---

## 🔒 Security Features

1. **Password Hashing**: Mật khẩu được hash bằng bcrypt (10 rounds)
2. **JWT Tokens**: Authentication sử dụng JWT với expiration
3. **Token Storage**: Token lưu trong localStorage (có thể upgrade sang httpOnly cookies)
4. **Password Reset**: Token có thời hạn 1 giờ, chỉ dùng 1 lần
5. **SQL Injection Prevention**: Parameterized queries
6. **Input Validation**: Email format, password length, etc.

---

## 🧪 Testing

### Test Register

```bash
curl -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "test123",
    "full_name": "Test User"
  }'
```

### Test Login

```bash
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "test123"
  }'
```

### Test Protected Route

```bash
curl -X GET http://localhost:4000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 📧 Email Configuration (Production)

Để gửi email thật trong production, cấu hình trong `.env`:

### Gmail

```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-specific-password
EMAIL_FROM=noreply@yourapp.com
```

**Note:** Với Gmail, cần tạo "App Password" trong Google Account settings.

### Other SMTP Providers

- **SendGrid**: `smtp.sendgrid.net`
- **Mailgun**: `smtp.mailgun.org`
- **AWS SES**: `email-smtp.region.amazonaws.com`

---

## 🐛 Troubleshooting

### Issue: "Invalid token"

- Kiểm tra token có trong localStorage
- Token có thể đã hết hạn (mặc định 7 days)
- Đăng nhập lại để lấy token mới

### Issue: "Email already registered"

- Email đã tồn tại trong database
- Thử với email khác hoặc đăng nhập

### Issue: Password reset không hoạt động

- Kiểm tra token có hợp lệ và chưa hết hạn
- Token chỉ dùng được 1 lần
- Kiểm tra email configuration nếu cần gửi email thật

### Issue: CORS errors

- Kiểm tra `FRONTEND_URL` trong `.env`
- Đảm bảo CORS middleware đã được setup

---

## ✅ Checklist

- [ ] Cài đặt dependencies (`npm install` trong backend)
- [ ] Cập nhật database schema
- [ ] Thêm JWT_SECRET vào `.env`
- [ ] (Optional) Cấu hình email cho production
- [ ] Test đăng ký
- [ ] Test đăng nhập
- [ ] Test quên mật khẩu
- [ ] Test reset password
- [ ] Test protected routes

---

**🎉 Hoàn thành! Hệ thống authentication đã sẵn sàng sử dụng!**
