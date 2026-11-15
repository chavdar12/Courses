<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Register</title>
</head>
<body>
<h1>Register form</h1>

<?php if (is_string($model)): ?>
    <p style="color: red"><?= htmlspecialchars($model) ?></p>
<?php endif; ?>

<form method="post" action="registerProcess">
    Username: <input type="text" name="username"><br/>
    Password: <input type="password" name="password"><br/>
    Confirm password:<input type="password" name="confirmPassword"><br/>
    <input type="submit" name="register" value="Register!"/>
</form>
</body>
</html>