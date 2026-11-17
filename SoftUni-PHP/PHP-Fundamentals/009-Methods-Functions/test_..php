<?php

// Runs every script in this lesson with the example input from the course and checks its output.
// Usage: php test_..php

// [script, stdin, expected stdout]
$cases = [
    ['001_sign_of_integer.php', "2", "The number 2 is positive."],
    ['001_sign_of_integer.php', "-5", "The number -5 is negative."],
    ['001_sign_of_integer.php', "0", "The number 0 is zero."],
    ['002_grades.php', "3.33", "Poor"],
    ['002_grades.php', "4.50", "Very good"],
    ['002_grades.php', "2.99", "Fail"],
    ['003_calculations.php', "add\n5\n5", "10"],
    ['003_calculations.php', "divide\n8\n2", "4"],
    ['003_calculations.php', "multiply\n5\n5", "25"],
    ['004_printing_triangle.php', "3", "1\n1 2\n1 2 3\n1 2\n1"],
    ['005_orders.php', "water\n5", "5.00"],
    ['005_orders.php', "coffee\n2", "3.00"],
    ['006_calculate_rectangle_area.php', "3\n4", "12"],
    ['006_calculate_rectangle_area.php', "6\n2", "12"],
    ['007_math_power.php', "2\n8", "256"],
    ['007_math_power.php', "5.5\n3", "166.375"],
    ['008_factorial.php', "5", "120"],
    ['008_factorial.php', "0", "1"],
    ['009_multiply_evens_by_odds.php', "-12345", "54"],
    ['009_multiply_evens_by_odds.php', "3453466", "220"],
    ['010_repeat_string.php', "abc\n3", "abcabcabc"],
    ['011_math_operations.php', "5\n*\n5", "25.00"],
    ['011_math_operations.php', "4\n/\n8", "0.50"],
    ['012_greeting_form.php', ['person' => 'Peter'], "Hello, Peter!"],
    ['012_greeting_form.php', ['person' => '<b>'], "Hello, &lt;b&gt;!"],
    ['013_multiply_form.php', ['num1' => '6', 'num2' => '7'], "42"],
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
