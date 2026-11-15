<?php
require 'db.php';

$countries = $db->query("SELECT name, capital, population FROM countries ORDER BY name")->fetchAll(PDO::FETCH_ASSOC);
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Countries</title>
</head>
<body>
<h1>Countries</h1>
<table border="1">
    <thead>
    <tr>
        <th>Name</th>
        <th>Capital</th>
        <th>Population</th>
    </tr>
    </thead>
    <tbody>
    <?php foreach ($countries as $country): ?>
        <tr>
            <td><?= e($country['name']) ?></td>
            <td><?= e($country['capital']) ?></td>
            <td><?= $country['population'] ?></td>
        </tr>
    <?php endforeach; ?>
    </tbody>
</table>
</body>
</html>
