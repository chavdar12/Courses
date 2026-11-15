<?php
$arr1 = explode(" ", readline());
$arr2 = explode(" ", readline());
$maxLength = max(count($arr1), count($arr2));

// the shorter array repeats from its start
$sums = [];
for ($i = 0; $i < $maxLength; $i++) {
    $sums[] = $arr1[$i % count($arr1)] + $arr2[$i % count($arr2)];
}

echo implode(" ", $sums);
