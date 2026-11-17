<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Age Discount</title>
</head>
<body>
<h2>Please enter your details:</h2>
<form name="form" method="post" action="#">
    <label for="age">Please enter your age:</label><br/>
    <input type="number" id="age" name="age" required/><br/>

    <label for="price">Please enter the price:</label><br/>
    <input type="number" id="price" name="price" required/><br/><br/>

    <input type="submit" name="submit" value="Go"/>
</form>

<?php
if (isset($_POST['submit'])) {
    $age = (int) $_POST['age'];
    $price = (float) $_POST['price'];

    if ($age <= 6 || $age >= 65) {
        $price = $price / 2;
        echo "Your age is $age. The discounted price is $$price.";
    } else {
        echo "Your age is $age. The price is $$price.";
    }
}
?>
</body>
</html>
