<?php

// float array keys get truncated to int, so key by the number's string form
$numbers = array_map(fn($n) => (string) floatval($n), explode(" ", trim(fgets(STDIN))));
$numberCount = [];

foreach ($numbers as $number) {
    if (array_key_exists($number, $numberCount)) {
        $numberCount[$number]++;
    } else {
        $numberCount[$number] = 1;
    }
}

ksort($numberCount, SORT_NUMERIC);

foreach ($numberCount as $number => $count) {
    echo "$number -> $count\n";
}
