<!doctype html>
<html lang="bg">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Is It August?</title>
</head>
<body>
<?php
$currentDate = date("d/m/Y");
echo "Днес е: " . $currentDate . "<br>";
if (date("n") == 8) {
    echo "Август е, и е наистина горещо.";
} else {
    echo "Не е август, така че поне не е горещо!";
}
?>
</body>
</html>
