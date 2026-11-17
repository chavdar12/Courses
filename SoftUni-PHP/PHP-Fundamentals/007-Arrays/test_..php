<?php

// Runs every script in this lesson with the example input from the course and checks its output.
// Usage: php test_..php

// [script, stdin, expected stdout]
$cases = [
    ['001_day_of_week.php', "1", "Monday"],
    ['001_day_of_week.php', "7", "Sunday"],
    ['001_day_of_week.php', "8", "Invalid Day!"],
    ['001_day_of_week.php', "0", "Invalid Day!"],
    ['002_print_numbers_in_reverse_order.php', "3\n10\n20\n30", "30 20 10"],
    ['002_print_numbers_in_reverse_order.php', "3\n30\n20\n10", "10 20 30"],
    ['003_round_numbers_away_from_zero.php', "0.9 1.5 2.4 2.5 3.14", "0.9 => 1\n1.5 => 2\n2.4 => 2\n2.5 => 3\n3.14 => 3"],
    ['003_round_numbers_away_from_zero.php', "-5.01 -1.599 -2.5 -1.50 0", "-5.01 => -5\n-1.599 => -2\n-2.5 => -3\n-1.50 => -2\n0 => 0"],
    ['004_reverse_array_of_strings.php', "a b c d e", "e d c b a"],
    ['004_reverse_array_of_strings.php', "-1 hi ho w", "w ho hi -1"],
    ['005_sum_even_numbers.php', "1 2 3 4 5 6", "12"],
    ['005_sum_even_numbers.php', "3 5 7 9", "0"],
    ['006_even_and_odd_subtraction.php', "1 2 3 4 5 6", "3"],
    ['006_even_and_odd_subtraction.php', "3 5 7 9", "-24"],
    ['007_equal_arrays.php', "10 20 30\n10 20 30", "Arrays are identical. Sum: 60"],
    ['007_equal_arrays.php', "1 2 3 4 5\n1 2 4 3 5", "Arrays are not identical. Found difference at 2 index"],
    ['008_condense_array_to_number.php', "2 10 3", "25"],
    ['008_condense_array_to_number.php', "5 0 4 1 2", "35"],
    ['008_condense_array_to_number.php', "1", "1"],
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
