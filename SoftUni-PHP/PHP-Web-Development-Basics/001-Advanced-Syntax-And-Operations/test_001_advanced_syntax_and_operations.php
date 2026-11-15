<?php
// Runs every script in this lesson with the example input from the course and checks its output.
// Usage: php test_001_advanced_syntax_and_operations.php

// [script, stdin, expected stdout]
$cases = [
    ['001_month_name.php', "2", "February"],
    ['001_month_name.php', "13", "Invalid Month!"],
    ['002_reverse_numbers.php', "3\n10\n20\n30", "30 20 10"],
    ['003_concat_pair.php', "1 22 122 5", "1 + 22 == 122"],
    ['003_concat_pair.php', "1 2 3", "No"],
    ['004_round_numbers.php', "0.5 -0.5 1.4 2.6", "0.5 => 1\n-0.5 => -1\n1.4 => 1\n2.6 => 3"],
    ['005_sum_arrays.php', "1 2 3 4 5\n2 3", "3 5 5 7 7"],
    ['006_fill_the_matrix.php', "3, A", "1 4 7\n2 5 8\n3 6 9"],
    ['006_fill_the_matrix.php', "3, B", "1 6 7\n2 5 8\n3 4 9"],
    ['007_count_chars.php', "hello", "h: 1\ne: 1\nl: 2\no: 1"],
    ['008_count_chars_sorted.php', "hello", "l: 2\no: 1\nh: 1\ne: 1"],
    ['009_print_matrix.php', "", "1 2 3 4 5\n6 7 8 9 10\n11 12 13 14 15\n16 17 18 19 20"],
    ['010_matrix_element.php', "2\n1 2\n3 4\n1 0", "3"],
    ['010_matrix_element.php', "2\n1 2\n3 4\n5 5", "Invalid Index"],
    ['011_matrix_max.php', "2\n1 9\n3 4", "9"],
    ['012_matrix_row_sums.php', "1\n1 1 1 1 1", "1 2 4 7 12"],
    ['013_diagonal_sums.php', "3\n11 2 4\n4 5 6\n10 8 -12", "4\n19"],
];


// stdin is a string for console scripts, or an array of request parameters for web pages
function run(string $script, string|array $stdin): array
{
    // warnings go to stderr so a noisy script fails its case instead of polluting stdout
    $command = [PHP_BINARY, '-d', 'display_errors=stderr', '-d', 'error_reporting=E_ALL'];
    if (is_array($stdin)) {
        $request = '$_SERVER["REQUEST_METHOD"] = "GET"; $_GET = $_POST = $_REQUEST = json_decode($argv[1], true); require $argv[2];';
        array_push($command, '-r', $request, '--', json_encode($stdin), $script);
        $stdin = '';
    } else {
        $command[] = $script;
    }
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
    // a web page only has to contain the expected text somewhere in its HTML
    $matches = is_array($stdin)
        ? str_contains($stdout, $expected)
        : normalize($stdout) === normalize($expected);
    if ($code === 0 && $stderr === '' && $matches) {
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

// a lesson script is NNN_name.php, or NNN_name/main.php for a multi-file project
$scripts = array_map(fn($path) => substr($path, strlen(__DIR__) + 1), array_merge(
    glob(__DIR__ . '/[0-9][0-9][0-9]_*.php'),
    glob(__DIR__ . '/[0-9][0-9][0-9]_*/main.php')
));
foreach (array_diff($scripts, array_column($cases, 0)) as $untested) {
    $failed++;
    echo "FAIL $untested has no test case" . PHP_EOL;
}

echo PHP_EOL . count($cases) . " cases, $failed failed" . PHP_EOL;
exit($failed === 0 ? 0 : 1);
