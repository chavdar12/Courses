<?php

$first = array_map('intval', explode(' ', trim(fgets(STDIN))));
$second = array_map('intval', explode(' ', trim(fgets(STDIN))));

while (count($first) > 0 && count($second) > 0) {
    $a = array_shift($first);
    $b = array_shift($second);
    // the winner puts his own card first, then the opponent's, at the bottom of his deck
    if ($a > $b) {
        array_push($first, $a, $b);
    } elseif ($b > $a) {
        array_push($second, $b, $a);
    }
}

if (count($first) > 0) {
    echo "First player wins! Sum: " . array_sum($first) . PHP_EOL;
} else {
    echo "Second player wins! Sum: " . array_sum($second) . PHP_EOL;
}
