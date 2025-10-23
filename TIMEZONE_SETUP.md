# ⏰ Hướng Dẫn Cấu Hình Múi Giờ Việt Nam

## 🚀 Các Bước Setup Nhanh

### Bước 1: Cấu Hình Backend

Thêm vào file **`backend/.env`**:

```env
TIMEZONE=+07:00
```

### Bước 2: Cấu Hình MySQL Server

#### Windows:

1. Mở file `my.ini` (thường ở `C:\ProgramData\MySQL\MySQL Server 8.0\my.ini`)
2. Thêm vào section `[mysqld]`:
   ```ini
   [mysqld]
   default-time-zone='+07:00'
   ```
3. Restart MySQL:
   - Mở Services (`Win + R` → `services.msc`)
   - Tìm MySQL → Right click → Restart

#### Mac:

```bash
# Edit MySQL config
sudo nano /usr/local/etc/my.cnf

# Thêm vào:
[mysqld]
default-time-zone='+07:00'

# Restart MySQL
brew services restart mysql
```

#### Linux:

```bash
# Edit MySQL config
sudo nano /etc/mysql/my.cnf

# Thêm vào:
[mysqld]
default-time-zone='+07:00'

# Restart MySQL
sudo systemctl restart mysql
```

### Bước 3: Restart Backend Server

```bash
cd backend
npm run dev
```

### Bước 4: Test Timezone

```bash
cd backend
node test-timezone.js
```

**Kết quả mong đợi:**

```
✅ TIMEZONE CONFIGURED CORRECTLY!
   All timestamps will use Vietnam timezone (GMT+7)
```

---

## 🔍 Kiểm Tra Nhanh

### Trong MySQL:

```sql
-- Kiểm tra timezone
SELECT @@global.time_zone, @@session.time_zone;
-- Kết quả mong đợi: +07:00

-- Kiểm tra thời gian
SELECT NOW();
-- Phải khớp với giờ Việt Nam hiện tại
```

### Trong Application:

1. Mở app: http://localhost:5173
2. Thêm một review mới
3. Kiểm tra thời gian hiển thị - phải đúng giờ Việt Nam

---

## ⚠️ Lưu Ý Quan Trọng

1. **Phải restart MySQL service** sau khi sửa file config
2. **Phải restart backend server** sau khi sửa .env
3. **Data cũ** (trước khi config) có thể vẫn sai giờ

### Fix Data Cũ (Nếu Cần):

```sql
-- Backup trước
CREATE TABLE reviews_backup AS SELECT * FROM reviews;

-- Update thời gian (cộng 7 giờ nếu data đang là UTC)
UPDATE reviews
SET created_at = DATE_ADD(created_at, INTERVAL 7 HOUR),
    updated_at = DATE_ADD(updated_at, INTERVAL 7 HOUR);
```

---

## 📚 Tài Liệu Chi Tiết

Xem file `backend/TIMEZONE_CONFIGURATION.md` để biết thêm chi tiết về:

- Troubleshooting
- Debug methods
- Best practices
- Advanced configuration

---

## ✅ Checklist Setup

- [ ] Thêm `TIMEZONE=+07:00` vào `backend/.env`
- [ ] Thêm `default-time-zone='+07:00'` vào MySQL config
- [ ] Restart MySQL service
- [ ] Restart backend server
- [ ] Chạy `node test-timezone.js` → Thấy ✅
- [ ] Test tạo review mới → Thời gian đúng
- [ ] Frontend hiển thị đúng múi giờ Việt Nam

---

**🎉 Sau khi setup xong, tất cả thời gian sẽ tự động theo múi giờ Việt Nam!**
