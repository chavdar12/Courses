<?php
setcookie('user', '', time() - 3600);
unset($_COOKIE['user']);
?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Delete Cookie</title>
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
<a href="welcome.php">Back to the welcome page</a>
</body>
</html>
