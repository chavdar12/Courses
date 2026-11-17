<?php
include 'config.php';

$sql1 = "
CREATE TABLE IF NOT EXISTS companyinfo (
    id INT(6) AUTO_INCREMENT PRIMARY KEY,
    companyname VARCHAR(30) NOT NULL,
    companynum VARCHAR(30) NOT NULL,
    townname VARCHAR(30) NOT NULL,
    companytel VARCHAR(30) NOT NULL,
    companyyear INT(5) NOT NULL,
    companycontact VARCHAR(30) NOT NULL
)";
if ($conn->query($sql1)) {
    echo "Table 'companyinfo' created successfully.<br>";
} else {
    echo "Error creating table 'companyinfo': " . $conn->error . "<br>";
}

$sql2 = "
CREATE TABLE IF NOT EXISTS towns (
    townid INT(5) AUTO_INCREMENT PRIMARY KEY,
    townname VARCHAR(30) NOT NULL
)";
if ($conn->query($sql2)) {
    echo "Table 'towns' created successfully.<br>";
} else {
    echo "Error creating table 'towns': " . $conn->error . "<br>";
}

$conn->close();
