CREATE DATABASE IF NOT EXISTS infobooks CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE infobooks;

CREATE TABLE IF NOT EXISTS book (
    id        INT AUTO_INCREMENT PRIMARY KEY,
    title     VARCHAR(255) NOT NULL,
    author    VARCHAR(255) NOT NULL,
    publisher VARCHAR(255) NOT NULL,
    year      VARCHAR(4)   NOT NULL
);
