<?php
require 'db.php';

$error = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim($_POST['username'] ?? '');
    $password = trim($_POST['password'] ?? '');

    if ($username === '' || $password === '') {
        $error = 'Username and password are required.';
    } else {
        try {
            $db->prepare("INSERT INTO users (username, password) VALUES (?, ?)")
                ->execute([$username, password_hash($password, PASSWORD_ARGON2I)]);
            header('Location: 003_login.php');
            exit;
        } catch (PDOException $e) {
            $error = 'This username is taken.';
        }
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Register</title>
</head>
<body>
<h1>Register</h1>
<p style="color: red"><?= e($error) ?></p>
<form method="post">
    <label>Username: <input type="text" name="username" required/></label><br/>
    <label>Password: <input type="password" name="password" required/></label><br/>
    <button type="submit">Register</button>
</form>
<a href="003_login.php">Login</a>
</body>
</html>
