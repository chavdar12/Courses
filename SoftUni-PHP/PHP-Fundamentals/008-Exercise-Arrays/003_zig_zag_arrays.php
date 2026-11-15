<?php

$n = intval(readline());
$array1 = [];
$array2 = [];
for ($i = 0; $i < $n; $i++) {
    list($a, $b) = explode(" ", readline());
    if ($i % 2 === 0) {
        $array1[] = $a;
        $array2[] = $b;
    } else {
        $array1[] = $b;
        $array2[] = $a;
    }
}
echo implode(" ", $array1) . PHP_EOL;
echo implode(" ", $array2) . PHP_EOL;
