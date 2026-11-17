<?php
if (isset($_POST['color'])) {
    setcookie('background-color', $_POST['color'], time() + 3600);
    header('Location: another.php');
    exit;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Pick a color</title>
</head>
<body>
<h1>Pick a background color</h1>
<form method="post">
    <select name="color">
        <option value="lightblue">Light blue</option>
        <option value="lightgreen">Light green</option>
        <option value="pink">Pink</option>
    </select>
    <button type="submit">Save</button>
</form>
</body>
</html>
