<!doctype html>
<html lang="bg">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Prime Check</title>
</head>
<body>
<form name="form" method="post" action="#">
    <label for="number">Въведете число:</label>
    <input id="number" type="number" name="a"/> <br/>
    <input type="submit" name="submit" value="Провери!"/>
</form>

<?php
function isPrime(int $a): bool
{
    if ($a < 2) {
        return false;
    }
    for ($i = 2; $i * $i <= $a; $i++) {
        if ($a % $i == 0) {
            return false;
        }
    }
    return true;
}

if (isset($_POST['submit'])) {
    $a = (int) $_POST['a'];
    echo isPrime($a) ? "Числото $a е просто" : "Числото $a не е просто";
}
?>
</body>
</html>
