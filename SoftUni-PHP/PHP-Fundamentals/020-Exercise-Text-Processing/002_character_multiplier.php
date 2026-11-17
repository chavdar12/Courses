<?php

function characterMultiplier($str1, $str2)
{
    $sum = 0;
    $length = min(strlen($str1), strlen($str2));

    for ($i = 0; $i < $length; $i++) {
        $sum += ord($str1[$i]) * ord($str2[$i]);
    }

    $longerStr = (strlen($str1) > strlen($str2)) ? $str1 : $str2;

    for ($i = $length; $i < strlen($longerStr); $i++) {
        $sum += ord($longerStr[$i]);
    }

    return $sum;
}

list($str1, $str2) = explode(' ', trim(fgets(STDIN)));

echo characterMultiplier($str1, $str2);
