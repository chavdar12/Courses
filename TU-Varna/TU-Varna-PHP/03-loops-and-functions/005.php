<!doctype html>
<html lang="bg">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Even Digits</title>
</head>
<body>
<form name="form" method="post" action="#">
    <label for="number">Въведете число:</label>
    <input id="number" type="number" name="a"/> <br/>
    <input type="submit" name="submit" value="Провери!"/>
</form>

<?php
if (isset($_POST['submit'])) {
    $number = (string) (int) $_POST['a'];

    $digitChar = str_split($number);
    $count = 0;

    foreach ($digitChar as $char) {
        if (is_numeric($char) && $char % 2 == 0) {
            $count++;
        }
    }

    echo "Числото $number съдържа $count четни цифри.";
}
?>
</body>
</html>
