<?php
// Runs every script in this lesson with the example input from the course and checks its output.
// Usage: php test_001_basic_syntax_conditional_statements_and_loops.php

// [script, stdin, expected stdout]
$cases = [
    ['001_student_information.php', "John\n15\n5.40", "Name: John, Age: 15, Grade: 5.40"],
    ['001_student_information.php', "Steve\n16\n2.50", "Name: Steve, Age: 16, Grade: 2.50"],
    ['002_passed.php', "5.32", "Passed!"],
    ['002_passed.php', "2.34", ""],
    ['003_passed_or_failed.php', "5.32", "Passed!"],
    ['003_passed_or_failed.php', "2.36", "Failed!"],
    ['004_back_in_30_minutes.php', "1\n46", "2:16"],
    ['004_back_in_30_minutes.php', "0\n01", "0:31"],
    ['004_back_in_30_minutes.php', "23\n59", "0:29"],
    ['004_back_in_30_minutes.php', "11\n32", "12:02"],
    ['005_month_printer.php', "2", "February"],
    ['005_month_printer.php', "13", "Error!"],
    ['006_foreign_languages.php', "USA", "English"],
    ['006_foreign_languages.php', "Germany", "unknown"],
    ['007_theatre_promotions.php', "Weekday\n42", "18$"],
    ['007_theatre_promotions.php', "Holiday\n-12", "Error!"],
    ['007_theatre_promotions.php', "Holiday\n15", "5$"],
    ['007_theatre_promotions.php', "Weekend\n122", "15$"],
    ['008_divisible_by_3.php', "", implode("\n", range(3, 99, 3))],
    ['009_sum_of_odd_numbers.php', "5", "1\n3\n5\n7\n9\nSum: 25"],
    ['009_sum_of_odd_numbers.php', "3", "1\n3\n5\nSum: 9"],
    ['010_multiplication_table.php', "5", implode("\n", array_map(fn($i) => "5 X $i = " . 5 * $i, range(1, 10)))],
    ['011_multiplication_table_2.php', "5\n8", "5 X 8 = 40\n5 X 9 = 45\n5 X 10 = 50"],
    ['011_multiplication_table_2.php', "2\n14", "2 X 14 = 28"],
    ['012_even_number.php', "1\n3\n-6", "Please write an even number.\nPlease write an even number.\nThe number is: 6"],
    ['012_even_number.php', "4", "The number is: 4"],
    ['013_price_change_alert.php', "3\n0.1\n10\n11\n11", "PRICE UP: 10.000000 to 11.000000 (10.00%)\nNO CHANGE: 11"],
    ['013_price_change_alert.php', "3\n0.5\n10\n9\n10", "MINOR CHANGE: 10.000000 to 9.000000 (-10.00%)\nMINOR CHANGE: 9.000000 to 10.000000 (11.11%)"],
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

$scripts = array_map('basename', glob(__DIR__ . '/[0-9][0-9][0-9]_*.php'));
foreach (array_diff($scripts, array_column($cases, 0)) as $untested) {
    $failed++;
    echo "FAIL $untested has no test case" . PHP_EOL;
}

echo PHP_EOL . count($cases) . " cases, $failed failed" . PHP_EOL;
exit($failed === 0 ? 0 : 1);
