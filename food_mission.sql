CREATE DATABASE IF NOT EXISTS food_mission;
USE food_mission;

CREATE TABLE IF NOT EXISTS users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(100),
    gender ENUM('남자', '여자', '선택안함'),
    birthdate DATE,
    address VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deactivated_at TIMESTAMP NULL,
    deactivated_date DATETIME NULL
);

CREATE TABLE IF NOT EXISTS food_category (
    food_category_id INT AUTO_INCREMENT PRIMARY KEY,
    food_type VARCHAR(30) NOT NULL
);

CREATE TABLE IF NOT EXISTS user_preferences (
    user_prefer_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    food_category_id INT,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (food_category_id) REFERENCES food_category(food_category_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS missions (
    mission_id INT AUTO_INCREMENT PRIMARY KEY,
    restaurant_name VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    min_amount BIGINT,
    points INT DEFAULT 500,
    region VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS user_missions (
    user_mission_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    mission_id INT,
    status ENUM('진행중', '완료') NOT NULL,
    completed_at TIMESTAMP NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (mission_id) REFERENCES missions(mission_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS reviews (
    review_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    mission_id INT,
    rest_id INT,
    review_text TEXT,
    rating INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (mission_id) REFERENCES missions(mission_id) ON DELETE CASCADE,
    FOREIGN KEY (rest_id) REFERENCES restaurants(rest_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS restaurants (
    rest_id INT AUTO_INCREMENT PRIMARY KEY,
    rest_name VARCHAR(50) NOT NULL,
    address VARCHAR(255),
    rating INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS notifications (
    user_id INT,
    event_alert BOOLEAN DEFAULT TRUE,
    review_reply_alert BOOLEAN DEFAULT TRUE,
    inquiry_reply_alert BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS inquiries (
    inquiry_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    title VARCHAR(255),
    content TEXT,
    image_url VARCHAR(255),
    status ENUM('대기중', '완료') DEFAULT '대기중',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS user_points (
    user_id INT,
    points INT,
    description VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

INSERT INTO users (username, password, name, gender, birthdate, address, is_active, created_at)
VALUES ('test_user', 'hashed_password', '홍길동', '남자', '1990-01-01', '서울시 강남구', TRUE, CURRENT_TIMESTAMP);
SELECT * FROM users WHERE username = 'test_user';
