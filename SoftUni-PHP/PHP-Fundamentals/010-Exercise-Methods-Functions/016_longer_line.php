<?php

function distance($x1, $y1, $x2, $y2)
{
    return sqrt(($x1 - $x2) ** 2 + ($y1 - $y2) ** 2);
}

// prints the line's points starting with the one closer to the center (0, 0)
function printLine($x1, $y1, $x2, $y2)
{
    if (distance($x1, $y1, 0, 0) <= distance($x2, $y2, 0, 0)) {
        echo "($x1, $y1)($x2, $y2)";
    } else {
        echo "($x2, $y2)($x1, $y1)";
    }
}

$c = [];
for ($i = 0; $i < 8; $i++) {
    $c[] = intval(trim(fgets(STDIN)));
}

if (distance($c[0], $c[1], $c[2], $c[3]) >= distance($c[4], $c[5], $c[6], $c[7])) {
    printLine($c[0], $c[1], $c[2], $c[3]);
} else {
    printLine($c[4], $c[5], $c[6], $c[7]);
}
