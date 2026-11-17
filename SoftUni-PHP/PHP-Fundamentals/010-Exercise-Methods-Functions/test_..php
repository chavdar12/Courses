<?php

// Runs every script in this lesson with the example input from the course and checks its output.
// Usage: php test_..php

// [script, stdin, expected stdout]
$cases = [
    ['001_smallest_of_three_numbers.php', "", "2"],
    ['002_vowels_count.php', "", "3"],
    ['003_characters_in_range.php', "", "b c"],
    ['004_password_validator.php', "", "Password must be between 6 and 10 characters\nPassword must have at least 2 digits"],
    ['005_add_and_subtract.php', "", "19"],
    ['006_middle_characters.php', "", "r"],
    ['007_nxn_matrix.php', "", "3 3 3\n3 3 3\n3 3 3"],
    ['008_factorial_division.php', "", "60.00"],
    ['009_palindrome_integers.php', "", "false\ntrue\nfalse\ntrue"],
    ['010_top_number.php', "", "17 35"],
    ['011_array_manipulator.php', "1 3 5 7 9\nexchange 1\nmax odd\nmin even\nfirst 2 odd\nlast 2 even\nexchange 3\nend", "2\nNo matches\n[5, 7]\n[]\n[3, 5, 7, 9, 1]"],
    ['011_array_manipulator.php', "1 10 100 1000\nmax even\nfirst 5 even\nexchange 10\nmin odd\nexchange 0\nmax even\nmin even\nend", "3\nInvalid count\nInvalid index\n0\n2\n0\n[10, 100, 1000, 1]"],
    ['012_even_numbers_up_to_n.php', ['num' => '10'], "2 4 6 8 10"],
    ['013_primes_down_from_n.php', ['num' => '10'], "7 5 3 2"],
    ['014_data_types.php', "int\n5", "10"],
    ['014_data_types.php', "real\n2.5", "3.75"],
    ['014_data_types.php', "string\nhello", "\$hello\$"],
    ['015_center_point.php', "2\n4\n-1\n2", "(-1, 2)"],
    ['016_longer_line.php', "2\n4\n-1\n2\n-5\n-5\n4\n-3", "(4, -3)(-5, -5)"],
    ['017_tribonacci_sequence.php', "4", "1 1 2 4"],
    ['017_tribonacci_sequence.php', "8", "1 1 2 4 7 13 24 44"],
    ['018_multiplication_sign.php', "5\n12\n-15", "negative"],
    ['018_multiplication_sign.php', "-6\n-12\n14", "positive"],
    ['018_multiplication_sign.php', "-1\n0\n-1", "zero"],
    ['019_product_lookup.php', "Bread Milk Eggs\n10 5 30\n1.50 2.20 0.30\nMilk\nEggs\ndone", "Milk costs: 2.20; Available quantity: 5\nEggs costs: 0.30; Available quantity: 30"],
    ['020_product_orders.php', "Bread Milk\n10 5\n1.50 2.20\nMilk 3\nMilk 3\nBread 10\ndone", "Milk x 3 costs 6.60\nWe do not have enough Milk\nBread x 10 costs 15.00"],
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
