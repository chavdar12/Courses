<!doctype html>
<html lang="bg">
<head>
    <meta charset="UTF-8">
    <title>Book Details</title>
</head>
<body>
<?php
require_once 'Book.php';

$newBook = new Book("PHP and MySQL", "Иван Иванов", "12 лв.");
$newBook->showBookDetails();
?>
</body>
</html>
