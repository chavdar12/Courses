<?php
// Runs every script in this lesson with the example input from the course and checks its output.
// Usage: php test_015_exercise_polymorphism_interfaces_and_abstraction.php

// [script, stdin, expected stdout]
$cases = [
    ['001_citizen/main.php', "Pesho\n25", "Pesho\n25"],
    ['002_wild_farm/main.php', "Cat Gray 1.1 Home Persian\nVegetable 4\nTiger Tom 167.7 Asia\nVegetable 1\nZebra Jaguar 500 Africa\nVegetable 150\nMouse Jerry 0.5 Anywhere\nVegetable 0\nEnd", "Meowwww\nCat[Gray, Persian, 1.1, Home, 4]\nROAAR!!!\nTigers are not eating that type of food!\nTiger[Tom, 167.7, Asia, 0]\nZs\nZebra[Jaguar, 500, Africa, 150]\nSQUEEEAAAK!\nMouse[Jerry, 0.5, Anywhere, 0]"],
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
