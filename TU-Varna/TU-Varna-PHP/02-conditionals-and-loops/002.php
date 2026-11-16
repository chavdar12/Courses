<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quadratic Equation</title>
</head>
<body>
<h2>Find solution for ax² + bx + c</h2>
<form name="form" method="post" action="#">
    <label for="a">a:</label>
    <input type="number" id="a" name="a" required/><br/>

    <label for="b">b:</label>
    <input type="number" id="b" name="b" required/><br/>

    <label for="c">c:</label>
    <input type="number" id="c" name="c" required/><br/>

    <input type="submit" name="submit" value="Find x"/>
</form>

<?php
if (isset($_POST['submit'])) {
    $a = (float) $_POST['a'];
    $b = (float) $_POST['b'];
    $c = (float) $_POST['c'];

    if ($a == 0) {
        exit('a must not be 0 for a quadratic equation.</body></html>');
    }

    $d = $b * $b - 4 * $a * $c;

    if ($d > 0) {
        $x1 = (-$b + sqrt($d)) / (2 * $a);
        $x2 = (-$b - sqrt($d)) / (2 * $a);
        echo "x₁ = ", number_format($x1, 3), "<br> x₂ = ", number_format($x2, 3);
    } elseif ($d == 0) {
        $x1 = -$b / (2 * $a);
        echo "x₁ = x₂ = ", number_format($x1, 3);
    } else {
        echo "No real solutions";
    }
}
?>
</body>
</html>
