<?php
$distances = array_map('intval', explode(" ", trim(fgets(STDIN))));
$removedSum = 0;

while (count($distances) > 0) {
    $index = intval(fgets(STDIN));

    $last = count($distances) - 1;
    // out of range: remove the end element and copy the opposite end in its place
    if ($index < 0) {
        $removed = $distances[0];
        $distances[0] = $distances[$last];
    } elseif ($index > $last) {
        $removed = $distances[$last];
        $distances[$last] = $distances[0];
    } else {
        $removed = $distances[$index];
        array_splice($distances, $index, 1);
    }
    $removedSum += $removed;

    foreach ($distances as &$distance) {
        if ($distance <= $removed) {
            $distance += $removed;
        } else {
            $distance -= $removed;
        }
    }
    unset($distance);
}

echo $removedSum . "\n";
?>