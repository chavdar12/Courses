<?php
// Runs every script in this lesson with the example input from the course and checks its output.
// Usage: php test_014_bitwise_operations.php

// [script, stdin, expected stdout]
$cases = [
    ['001_binary_digits_count.php', "20\n0", "3"],
    ['001_binary_digits_count.php', "15\n1", "4"],
    ['002_first_bit.php', "2", "1"],
    ['002_first_bit.php', "51", "1"],
    ['002_first_bit.php', "13", "0"],
    ['003_p_th_bit.php', "2145\n5", "1"],
    ['003_p_th_bit.php', "512\n0", "0"],
    ['003_p_th_bit.php', "111\n8", "0"],
    ['003_p_th_bit.php', "255\n7", "1"],
    ['004_bit_destroyer.php', "1313\n5", "1281"],
    ['004_bit_destroyer.php', "231\n2", "227"],
    ['004_bit_destroyer.php', "111\n6", "47"],
    ['005_odd_occurrences.php', "1 2 3 2 1", "3"],
    ['005_odd_occurrences.php', "7", "7"],
    ['006_bit_flipper.php', "44444\n4", "44524"],
    ['006_bit_flipper.php', "0\n0", "7"],
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
