<?php
$fieldSize = intval(fgets(STDIN));
$field = array_fill(0, $fieldSize, 0);
$ladybugs = preg_split('/\s+/', trim(fgets(STDIN)), -1, PREG_SPLIT_NO_EMPTY);
foreach ($ladybugs as $index) {
    $index = intval($index);
    if ($index >= 0 && $index < $fieldSize) {
        $field[$index] = 1;
    }
}

while (($command = trim(fgets(STDIN))) !== 'end') {
    list($index, $direction, $length) = explode(' ', $command);
    $index = intval($index);
    $step = $direction === 'right' ? intval($length) : -intval($length);
    if ($index < 0 || $index >= $fieldSize || $field[$index] === 0) {
        continue;
    }

    // fly over occupied cells until landing on a free one or leaving the field
    $field[$index] = 0;
    do {
        $index += $step;
    } while ($index >= 0 && $index < $fieldSize && $field[$index] === 1);

    if ($index >= 0 && $index < $fieldSize) {
        $field[$index] = 1;
    }
}

echo implode(' ', $field) . PHP_EOL;
