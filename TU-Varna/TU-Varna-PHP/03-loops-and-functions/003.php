<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Multiplication Table</title>
</head>
<body>
<?php
echo "<table border='4'>";
for ($i = 1; $i <= 7; $i++) {
    echo "<tr>";
    for ($j = 1; $j <= 7; $j++) {
        $num = $i * $j;
        echo "<td> $num </td>";
    }
    echo "</tr>";
}
echo "</table>";
?>

</body>
</html>
