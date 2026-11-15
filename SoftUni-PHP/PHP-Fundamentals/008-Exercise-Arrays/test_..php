<?php
// Runs every script in this lesson with the example input from the course and checks its output.
// Usage: php test_..php

// [script, stdin, expected stdout]
$cases = [
    ['001_train.php', "3\n13\n24\n8", "13 24 8\n45"],
    ['001_train.php', "1\n100", "100\n100"],
    ['002_common_elements.php', "Hey hello 2 4\n10 hey 4 hello", "4 hello"],
    ['002_common_elements.php', "S of t un i\nof i 10 un", "of i un"],
    ['003_zig_zag_arrays.php', "4\n1 5\n9 10\n31 81\n41 20", "1 10 31 20\n5 9 81 41"],
    ['003_zig_zag_arrays.php', "2\n80 23\n31 19", "80 19\n23 31"],
    ['004_array_rotation.php', "51 47 32 61 21\n2", "32 61 21 51 47"],
    ['004_array_rotation.php', "32 21 61 1\n4", "32 21 61 1"],
    ['004_array_rotation.php', "2 4 15 31\n5", "4 15 31 2"],
    ['005_top_integers.php', "1 4 3 2", "4 3 2"],
    ['005_top_integers.php', "14 24 3 19 15 17", "24 19 17"],
    ['006_equal_sums.php', "1 2 3 3", "2"],
    ['006_equal_sums.php', "1 2", "no"],
    ['006_equal_sums.php', "1", "0"],
    ['006_equal_sums.php', "10 5 5 99 3 4 2 5 1 1 4", "3"],
    ['007_max_sequence_of_equal_elements.php', "2 1 1 2 3 3 2 2 2 1", "2 2 2"],
    ['007_max_sequence_of_equal_elements.php', "1 1 1 2 3 1 3 3", "1 1 1"],
    ['007_max_sequence_of_equal_elements.php', "0 1 1 5 2 2 6 3 3", "1 1"],
    ['008_magic_sum.php', "1 7 6 2 19 23\n8", "1 7\n6 2"],
    ['008_magic_sum.php', "14 20 60 13 7 19 8\n27", "14 13\n20 7\n19 8"],
    ['009_easter_gifts.php', "Eggs StuffedAnimal Cozonac Sweets EasterBunny Eggs Clothes\nOutOfStock Eggs\nRequired Spoon 2\nJustInCase ChocolateEgg\nNo Money", "StuffedAnimal Spoon Sweets EasterBunny ChocolateEgg"],
    ['009_easter_gifts.php', "Sweets Cozonac Clothes Flowers Wine Clothes Eggs Clothes\nRequired Paper 8\nOutOfStock Clothes\nRequired Chocolate 2\nJustInCase Hat\nOutOfStock Cable\nNo Money", "Sweets Cozonac Chocolate Flowers Wine Eggs Hat"],
    ['010_encrypt_sort_and_print_array.php', "4\nPeter\nMaria\nKatya\nTodor", "1032 1071 1168 1532"],
    ['010_encrypt_sort_and_print_array.php', "3\nSofia\nLondon\nWashington", "1396 1601 3202"],
    ['011_pascal_triangle.php', "4", "1\n1 1\n1 2 1\n1 3 3 1"],
    ['011_pascal_triangle.php', "1", "1"],
    ['012_recursive_fibonacci.php', "5", "5"],
    ['012_recursive_fibonacci.php', "7", "13"],
    ['013_array_jump_sum.php', "1 2 3", "3"],
    ['013_array_jump_sum.php', "2 1 1", "4"],
    ['014_longest_increasing_subsequence.php', "1", "1"],
    ['014_longest_increasing_subsequence.php', "7 3 5 8 -1 0 6 7", "3 5 6 7"],
    ['014_longest_increasing_subsequence.php', "3 14 5 12 15 7 8 9 11 10 1", "3 5 7 8 9 11"],
    ['015_kamino_factory.php', "5\n1!0!1!1!0\n0!1!1!0!0\nClone them!", "Best DNA sample 2 with sum: 2.\n0 1 1 0 0"],
    ['015_kamino_factory.php', "4\n1!1!0!1\n1!0!0!1\n1!1!0!0\nClone them!", "Best DNA sample 1 with sum: 3.\n1 1 0 1"],
    ['016_ladybugs.php', "3\n0 1\n0 right 1\n2 right 1\nend", "0 1 0"],
    ['016_ladybugs.php', "3\n0 1 2\n0 right 1\n1 right 1\n2 right 1\nend", "0 0 0"],
    ['016_ladybugs.php', "5\n3\n3 left 2\n1 left -2\nend", "0 0 0 1 0"],
];

function run(string $script, string $stdin): array
{
    // warnings go to stderr so a noisy script fails its case instead of polluting stdout
    $command = [PHP_BINARY, '-d', 'display_errors=stderr', '-d', 'error_reporting=E_ALL', $script];
    $process = proc_open($command, [['pipe', 'r'], ['pipe', 'w'], ['pipe', 'w']], $pipes, __DIR__);
    fwrite($pipes[0], $stdin . "\n");
    fclose($pipes[0]);
    $stdout = stream_get_contents($pipes[1]);
    $stderr = stream_get_contents($pipes[2]);
    return [proc_close($process), $stdout, $stderr];
}

// judge-style comparison: ignore trailing spaces and blank lines at the edges
function normalize(string $text): string
{
    $lines = explode("\n", str_replace("\r", '', trim($text)));
    return implode("\n", array_map('rtrim', $lines));
}

$failed = 0;
foreach ($cases as [$script, $stdin, $expected]) {
    [$code, $stdout, $stderr] = run($script, $stdin);
    if ($code === 0 && $stderr === '' && normalize($stdout) === normalize($expected)) {
        echo "ok   $script" . PHP_EOL;
        continue;
    }
    $failed++;
    echo "FAIL $script" . PHP_EOL
        . "  stdin:    " . json_encode($stdin) . PHP_EOL
        . "  expected: " . json_encode(normalize($expected)) . PHP_EOL
        . "  actual:   " . json_encode(normalize($stdout)) . PHP_EOL
        . ($stderr === '' ? '' : "  stderr:   " . trim($stderr) . PHP_EOL);
}

$scripts = array_map('basename', glob(__DIR__ . '/[0-9][0-9][0-9]_*.php'));
foreach (array_diff($scripts, array_column($cases, 0)) as $untested) {
    $failed++;
    echo "FAIL $untested has no test case" . PHP_EOL;
}

echo PHP_EOL . count($cases) . " cases, $failed failed" . PHP_EOL;
exit($failed === 0 ? 0 : 1);
