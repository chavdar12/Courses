<?php
$numbers = explode(" ", readline());
foreach ($numbers as $num) {
    echo $num . " => " . round(floatval($num)) . PHP_EOL;
}
