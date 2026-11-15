<?php

// Generates many boards and checks each is a valid fourdoku, then checks the page renders one.
// Usage: php test_011_problem_solving.php
require_once __DIR__ . '/fourdoku.php';

function isValid(array $m): bool
{
    for ($i = 0; $i < 4; $i++) {
        $box = [];
        for ($j = 0; $j < 4; $j++) {
            $box[] = $m[intdiv($i, 2) * 2 + intdiv($j, 2)][($i % 2) * 2 + $j % 2];
        }
        foreach ([$m[$i], array_column($m, $i), $box] as $group) {
            sort($group);
            if ($group !== [1, 2, 3, 4]) {
                return false;
            }
        }
    }
    return true;
}

$failed = 0;
$fourdoku = new Fourdoku();
for ($run = 0; $run < 200; $run++) {
    $fourdoku->generate();
    if (!isValid($fourdoku->getMatrix())) {
        $failed++;
        echo "FAIL invalid board: " . json_encode($fourdoku->getMatrix()) . PHP_EOL;
    }
}
echo ($failed ? 'FAIL' : 'ok  ') . " fourdoku.php (200 boards)" . PHP_EOL;

ob_start();
require __DIR__ . '/index.php';
$cells = substr_count(ob_get_clean(), '<td>');
echo ($cells === 16 ? 'ok  ' : 'FAIL') . " index.php renders $cells cells" . PHP_EOL;
$failed += $cells === 16 ? 0 : 1;

exit($failed === 0 ? 0 : 1);
