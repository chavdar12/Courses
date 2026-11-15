<?php /** @var string|null $data error message */ ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Login</title>
</head>
<body>
<h1>Login</h1>
<?php if ($data): ?>
    <p style="color: red"><?= htmlspecialchars($data) ?></p>
<?php endif; ?>
<form method="post">
    <label>Username: <input type="text" name="username" required/></label><br/>
    <label>Password: <input type="password" name="password" required/></label><br/>
    <button type="submit">Login</button>
</form>
<a href="register.php">Register</a>
</body>
</html>
