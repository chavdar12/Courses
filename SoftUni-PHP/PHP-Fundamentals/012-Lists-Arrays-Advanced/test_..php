<?php

// Runs every script in this lesson with the example input from the course and checks its output.
// Usage: php test_..php

// [script, stdin, expected stdout]
$cases = [
    ['001_remove_negatives_and_reverse.php', "10 -5 7 9 -33 50", "50 9 7 10"],
    ['001_remove_negatives_and_reverse.php', "7 -2 -10 1", "1 7"],
    ['001_remove_negatives_and_reverse.php', "-1 -2 -3", "empty"],
    ['002_sum_adjacent_equal_numbers.php', "3 3 6 1", "12 1"],
    ['002_sum_adjacent_equal_numbers.php', "8 2 2 4 8 16", "16 8 16"],
    ['002_sum_adjacent_equal_numbers.php', "5 4 2 1 1 4", "5 8 4"],
    ['003_gauss_trick.php', "1 2 3 4 5", "6 6 3"],
    ['003_gauss_trick.php', "1 2 3 4", "5 5"],
    ['004_list_of_products.php', "4\nPotatoes\nTomatoes\nOnions\nApples", "1.Apples\n2.Onions\n3.Potatoes\n4.Tomatoes"],
    ['005_list_manipulation_basics.php', "4 19 2 53 6 43\nAdd 3\nRemove 2\nRemoveAt 1\nInsert 8 3\nend", "4 53 6 8 43 3"],
    ['005_list_manipulation_basics.php', "1 2 1 3\nRemove 1\nend", "2 1 3"],
    ['006_list_manipulation_advanced.php', "2 13 43 876 342 23 543\nContains 100\nContains 543\nPrint even\nPrint odd\nGet sum\nFilter >= 43\nFilter < 100\nend", "No such number\nYes\n2 876 342\n13 43 23 543\n1842\n43 876 342 543\n2 13 43 23"],
    ['007_merging_lists.php', "3 5 2 43 12 3 54 10 23\n76 5 34 2 4 12", "3 76 5 5 2 34 43 2 12 4 3 12 54 10 23"],
    ['007_merging_lists.php', "76 5 34 2 4 12\n3 5 2 43 12 3 54 10 23", "76 3 5 5 34 2 2 43 4 12 12 3 54 10 23"],
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
