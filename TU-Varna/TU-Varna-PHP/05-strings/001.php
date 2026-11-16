<!doctype html>
<html lang="bg">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Rectangle Area</title>
</head>
<body>
<p>ЛИЦЕ НА ПРАВОЪГЪЛНИК</p>
<form name="form" method="post" action="#">
    Въведете дължина и ширина на правоъгълник:<br>
    <label for="l">Дължина:</label>
    <input type="number" id="l" name="l" min="0" required/>
    <label for="w">Ширина:</label>
    <input type="number" id="w" name="w" min="0" required/> <br/>
    <input type="submit" name="submit" value="GO!"/>
</form>

<?php
if (isset($_POST['submit'])) {
    $l = $_POST['l'];
    $w = $_POST['w'];

    // Validate inputs to ensure they are numeric and non-negative
    if (is_numeric($l) && is_numeric($w) && $l >= 0 && $w >= 0) {
        $area = $l * $w;

        // Output the area with proper styling
        echo "<p style='color: #4CAF50;'>Правоъгълник с дължина $l и ширина $w има лице $area</p>";
    } else {
        echo "<p style='color: red;'>Моля, въведете валидни числа за дължина и ширина.</p>";
    }
}
?>
</body>
</html>
