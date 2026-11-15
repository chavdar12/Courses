<?php /** @var string|null $data error message */ ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Register</title>
</head>
<body>
<h1>Register</h1>
<?php if ($data): ?>
    <p style="color: red"><?= htmlspecialchars($data) ?></p>
<?php endif; ?>
<form method="post">
    <label>Username: <input type="text" name="username" required/></label><br/>
    <label>Password: <input type="password" name="password" required/></label><br/>
    <label>Confirm password: <input type="password" name="confirm_password" required/></label><br/>
    <button type="submit">Register</button>
</form>
<a href="login.php">Login</a>
</body>
</html>
