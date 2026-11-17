<?php
session_start();
if (isset($_POST['username']) && trim($_POST['username']) !== '') {
    session_regenerate_id(true);
    $_SESSION['logged_in_user'] = trim($_POST['username']);
    header('Location: another.php');
    exit;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Login</title>
</head>
<body>
<h1>Login</h1>
<form method="post">
    <label>Name: <input type="text" name="username" required/></label>
    <button type="submit">Login</button>
</form>
</body>
</html>
