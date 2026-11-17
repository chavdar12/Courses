<?php

$numbers = explode(" ", readline());
$maxCount = 0;
$number = "";

foreach ($numbers as $current) {
    $currentCount = count(array_keys($numbers, $current));
    if ($currentCount > $maxCount) {
        $maxCount = $currentCount;
        $number = $current;
    }
}

echo implode(" ", array_fill(0, $maxCount, $number));
