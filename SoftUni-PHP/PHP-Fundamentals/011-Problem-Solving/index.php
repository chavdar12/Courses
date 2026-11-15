<?php
require_once __DIR__ . '/fourdoku.php';

$fourdoku = new Fourdoku();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Fourdoku</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
<div class="board">
    <h1>Fourdoku</h1>
    <?php $fourdoku->print(); ?>
</div>
</body>
</html>
