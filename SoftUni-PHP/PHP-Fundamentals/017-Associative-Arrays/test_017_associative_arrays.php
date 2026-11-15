<?php
// Runs every script in this lesson with the example input from the course and checks its output.
// Usage: php test_017_associative_arrays.php

// [script, stdin, expected stdout]
$cases = [
    ['001_count_chars.php', "text", "t -> 2\ne -> 1\nx -> 1"],
    ['001_count_chars.php', "text text text", "t -> 6\ne -> 3\nx -> 3"],
    ['002_count_real_numbers.php', "8 2.5 2.5 8 2.5", "2.5 -> 3\n8 -> 2"],
    ['002_count_real_numbers.php', "1.5 5 1.5 3", "1.5 -> 2\n3 -> 1\n5 -> 1"],
    ['002_count_real_numbers.php', "-2 0.33 0.33 2", "-2 -> 1\n0.33 -> 2\n2 -> 1"],
    ['003_odd_occurrences.php', "Java C# PHP PHP JAVA C java", "java c# c"],
    ['003_odd_occurrences.php', "3 5 5 hi pi HO Hi 5 ho 3 hi pi", "5 hi"],
    ['004_sum_by_town.php', "Sofia, 20, Varna, 3, Sofia, 5, Varna, 4", "Sofia => 25\nVarna => 7"],
    ['005_word_synonyms.php', "3\ncute\nadorable\ncute\ncharming\nsmart\nclever", "cute - adorable, charming\nsmart - clever"],
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
