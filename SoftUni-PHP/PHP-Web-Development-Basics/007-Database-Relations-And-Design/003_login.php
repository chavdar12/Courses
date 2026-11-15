<?php
require 'db.php';
session_start();

$error = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $statement = $db->prepare("SELECT username, password FROM users WHERE username = ?");
    $statement->execute([$_POST['username'] ?? '']);
    $user = $statement->fetch(PDO::FETCH_ASSOC);

    if ($user && password_verify($_POST['password'] ?? '', $user['password'])) {
        session_regenerate_id(true);
        $_SESSION['username'] = $user['username'];
        header('Location: 003_login.php');
        exit;
    }
    $error = 'Invalid username or password.';
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Login</title>
</head>
<body>
<?php if (isset($_SESSION['username'])): ?>
    <h1>Welcome, <?= e($_SESSION['username']) ?>!</h1>
    <a href="001_countries.php">See the countries</a>
<?php else: ?>
    <h1>Login</h1>
    <p style="color: red"><?= e($error) ?></p>
    <form method="post">
        <label>Username: <input type="text" name="username" required/></label><br/>
        <label>Password: <input type="password" name="password" required/></label><br/>
        <button type="submit">Login</button>
    </form>
    <a href="002_register.php">Register</a>
<?php endif; ?>
</body>
</html>
