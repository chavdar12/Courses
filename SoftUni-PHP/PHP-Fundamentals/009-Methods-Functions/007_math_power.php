<?php

function calculatePower($num, $power)
{
    return pow($num, $power);
}

$num = floatval(fgets(STDIN));
$power = intval(fgets(STDIN));

echo calculatePower($num, $power) . "\n";
