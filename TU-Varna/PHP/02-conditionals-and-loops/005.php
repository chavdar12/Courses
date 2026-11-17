<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Digit Counter</title>
</head>
<body>
<FORM name="form" method="post" action="#">
    <label for="number">Enter the number:</label>
    <input type="text" name="number" id="number"/> <br/>
    <label for="digit">Enter the digit:</label>
    <input type="text" name="digit" id="digit"/> <br/>
    <input type="submit" name="submit" value="GO"/>
</FORM>

<?php
if (isset($_POST['submit'])) {
    $number = $_POST['number'];
    $digit = $_POST['digit'];

    if (!is_numeric($number) || !is_numeric($digit)) {
        echo "Please enter valid numeric values.";
    } else {
        $digitChar = str_split($number);
        $count = 0;

        foreach ($digitChar as $char) {
            if ($char == $digit) {
                $count++;
            }
        }

        echo "The number contains $count times digit $digit.";
    }
}
?>
</body>
</html>
