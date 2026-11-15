<?php
// Runs every script in this lesson with the example input from the course and checks its output.
// Usage: php test_..php

// [script, stdin, expected stdout]
$cases = [
    ['001_sum_digits.php', "245678", "32"],
    ['001_sum_digits.php', "97561", "28"],
    ['002_chars_to_string.php', "a\nb\nc", "abc"],
    ['002_chars_to_string.php', "%\n2\na", "%2a"],
    ['003_town_info.php', "Sofia\n1286383\n492", "Town Sofia has population of 1286383 and area 492 square km."],
    ['004_convert_meters_to_kilometers.php', "1852", "1.85"],
    ['004_convert_meters_to_kilometers.php', "798", "0.80"],
    ['005_pounds_to_dollars.php', "80", "104.800"],
    ['005_pounds_to_dollars.php', "39", "51.090"],
    ['006_reversed_chars.php', "A\nB\nC", "C B A"],
    ['007_lower_or_upper.php', "L", "upper-case"],
    ['007_lower_or_upper.php', "f", "lower-case"],
    ['008_snowballs.php', "2\n10\n2\n3\n5\n5\n5", "10 : 2 = 125 (3)"],
    ['008_snowballs.php', "3\n10\n5\n7\n16\n4\n2\n20\n2\n2", "10 : 5 = 128 (7)"],
    ['009_poke_mon.php', "5\n2\n3", "1\n2"],
    ['009_poke_mon.php', "10\n5\n2", "2\n1"],
    ['010_sum_digits_of_bigger_number.php', "2\n12 345\n99 7", "12\n18"],
    ['011_exchange_integers.php', "5\n10", "Before: a = 5 b = 10\nAfter: a = 10 b = 5"],
    ['012_floating_equality.php', "5.3\n6.01", "False"],
    ['012_floating_equality.php', "5.00000001\n5.00000003", "True"],
    ['013_data_type_finder.php', "5\n2.5\ntrue\na\nstring\nEND", "5 is integer type\n2.5 is floating point type\ntrue is boolean type\na is character type\nstring is string type"],
    ['014_prime_number_checker.php', "5", "2 -> true\n3 -> true\n4 -> false\n5 -> true"],
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
