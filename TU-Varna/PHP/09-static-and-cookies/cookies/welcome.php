<?php
if (!isset($_COOKIE['user'])) {
    setcookie('user', 'Guest', time() + 3600);
}
?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Welcome Page</title>
</head>
<body>
<?php
if (isset($_COOKIE['user'])) {
    echo "Welcome " . htmlspecialchars($_COOKIE['user']) . "!<br>";
} else {
    echo "No existing cookies<br>";
}

echo "All cookies: <br>";
echo htmlspecialchars(print_r($_COOKIE, true));
?>
<a href="last.php">Next page - delete cookie</a>
</body>
</html>
