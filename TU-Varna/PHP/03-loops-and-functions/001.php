<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cubes List</title>
</head>
<body>
<?php
$x = 1;

echo "<ul>";
for ($i = 1; $i <= 10; $i++) {
    echo "<li>X = $x</li>";

    echo "<ul>";
    echo "<li>X ^ 3 = " . pow($x, 3) . "</li>";
    echo "</ul>";

    $x++;
}
echo "</ul>";
?>
</body>
</html>
