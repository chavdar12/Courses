<?php
$array = array_map('intval', explode(' ', fgets(STDIN)));
$sum = 0;
$i = 0;
// a visited cell is zeroed, so landing on a 0 ends the walk instead of looping forever
while ($i >= 0 && $i < count($array) && $array[$i] !== 0) {
    $sum += $array[$i];
    $step = $array[$i];
    $array[$i] = 0;
    if ($i + $step < count($array)) {
        $i += $step;
    } elseif ($i - $step >= 0) {
        $i -= $step;
    } else {
        break;
    }
}
echo $sum . PHP_EOL;
