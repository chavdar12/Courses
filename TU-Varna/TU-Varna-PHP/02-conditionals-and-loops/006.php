<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Squares and Square Roots</title>
</head>
<body>
<?php
echo "x&emsp;square&emsp;squareRoot <br>";
$x = 1;
for ($i = 1; $i <= 12; $i++) {
    $square = round(pow($x, 2), 2);
    $squareRoot = round(sqrt($x), 2);
    echo "$x&emsp;";
    echo "$square&emsp;";
    echo "$squareRoot <br>";
    $x++;
}
?>
</body>
</html>
