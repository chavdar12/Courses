<?php
$host = 'localhost';
$dbUser = 'root';
$dbPass = '';
$dbName = 'guest';

// Connect to the server first so the database can be created on first run
$dbConn = new mysqli($host, $dbUser, $dbPass);
if ($dbConn->connect_error) {
    die('Грешка при връзка със сървъра: ' . $dbConn->connect_error);
}

if (!$dbConn->query("CREATE DATABASE IF NOT EXISTS $dbName CHARACTER SET utf8mb4") || !$dbConn->select_db($dbName)) {
    die('Грешка при избор на БД: ' . $dbConn->error);
}

$dbConn->set_charset('utf8mb4');
