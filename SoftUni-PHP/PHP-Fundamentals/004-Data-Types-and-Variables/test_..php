<?php
// Runs every script in this lesson with the example input from the course and checks its output.
// Usage: php test_..php

// [script, stdin, expected stdout]
$special15 = "1 -> False\n2 -> False\n3 -> False\n4 -> False\n5 -> True\n6 -> False\n7 -> True\n8 -> False\n9 -> False\n10 -> False\n11 -> False\n12 -> False\n13 -> False\n14 -> True\n15 -> False";
$cases = [
    ['001_integer_operations.php', "10\n20\n3\n3", "30"],
    ['001_integer_operations.php', "15\n14\n2\n3", "43"],
    ['002_circle_area_12_digits.php', "2", "12.566370614359"],
    ['002_circle_area_12_digits.php', "1.5", "7.068583470577"],
    ['003_elevator.php', "17\n3", "6"],
    ['003_elevator.php', "4\n5", "1"],
    ['003_elevator.php', "10\n5", "2"],
    ['004_centuries_to_minutes.php', "1", "1 centuries = 100 years = 36524 days = 876576 hours = 52594560 minutes"],
    ['004_centuries_to_minutes.php', "5", "5 centuries = 500 years = 182621 days = 4382904 hours = 262974240 minutes"],
    ['005_special_numbers.php', "15", $special15],
    ['006_triples_of_latin_letters.php', "2", "aaa aab aba abb baa bab bba bbb"],
    ['007_concat_names.php', "John\nSmith\n->", "John->Smith"],
    ['007_concat_names.php', "Jan\nWhite\n<->", "Jan<->White"],
    ['008_refactor_volume_of_pyramid.php', "2\n3\n4", "Length: Width: Height: Pyramid Volume: 8.00"],
    ['009_refactor_special_numbers.php', "15", $special15],
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
