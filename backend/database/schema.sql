-- Create database
CREATE DATABASE IF NOT EXISTS reviews_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE reviews_db;

-- Products table
CREATE TABLE IF NOT EXISTS products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    image_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Reviews table
CREATE TABLE IF NOT EXISTS reviews (
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert sample data for products
INSERT INTO products (name, description, image_url) VALUES
('iPhone 15 Pro Max', 'Premium smartphone from Apple with A17 Pro chip', 'https://images.unsplash.com/photo-1592286927505-38c8853b4a19?w=400'),
('Samsung Galaxy S24', 'Flagship Android device with excellent camera', 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400'),
('MacBook Pro M3', 'High-performance laptop for developers', 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400'),
('AirPods Pro 2', 'Active noise cancelling earbuds', 'https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=400');

-- Insert sample data for reviews
INSERT INTO reviews (product_id, user_name, rating, comment) VALUES
(1, 'John Smith', 5, 'Amazing product! Camera is beautiful and super smooth.'),
(1, 'Emily Johnson', 4, 'Good but price is a bit high compared to specs.'),
(1, 'Michael Brown', 5, 'Worth every penny, great battery life and beautiful display!'),
(2, 'Sarah Davis', 5, 'Best Android device right now, very smooth!'),
(2, 'David Wilson', 4, 'Good product, but OneUI is a bit heavy.'),
(3, 'Jennifer Garcia', 5, 'Very powerful machine for programming and design.'),
(3, 'James Martinez', 5, '18 hours battery life, absolutely amazing!'),
(4, 'Lisa Anderson', 4, 'Great noise cancellation, but a bit pricey.');

-- View to get aggregated statistics
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

