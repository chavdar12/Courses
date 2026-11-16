<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Inheritance</title>
</head>
<body>
<?php
require_once 'Programmer.php';

$programmer = new Programmer('Ivan', 'Ivanov');
$programmer->showPerson();
$programmer->addLanguages();
?>
</body>
</html>
