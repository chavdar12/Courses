<?php /** @var \App\Data\UserDTO $data */ ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Profile</title>
</head>
<body>
<h1>Welcome, <?= htmlspecialchars($data->getUsername()) ?>!</h1>
<a href="logout.php">Logout</a>
</body>
</html>
