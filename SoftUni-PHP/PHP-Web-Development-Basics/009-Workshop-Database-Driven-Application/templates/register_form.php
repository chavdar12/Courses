<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Register form</title>
</head>
<body>
<h1>Register form</h1>

Or go to <a href="login.php">login</a>, if you have an account
<br/>
<form method="post">
    Username:<input type="text" value="<?= e($username); ?>" name="username"/><br/>
    Pass: <input type="password" name="password"/><br/>
    <input type="submit"/>
</form>
<div id="response">
    <?= $response; ?>
</div>
</body>
</html>