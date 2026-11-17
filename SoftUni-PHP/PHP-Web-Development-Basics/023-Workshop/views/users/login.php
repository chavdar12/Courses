<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Login</title>
</head>
<body>
<h1>Login form</h1>

<?php if (is_string($model)): ?>
    <p style="color: red"><?= htmlspecialchars($model) ?></p>
<?php endif; ?>

<form method="post" action="loginProcess">
    Username: <input type="text" name="username"><br/>
    Password: <input type="password" name="password"><br/>
    <input type="submit" name="login" value="Login!"/>
</form>
</body>
</html>