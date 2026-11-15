<?php
// Runs every script in this lesson with the example input from the course and checks its output.
// Usage: php test_015_objects_and_classes.php

// [script, stdin, expected stdout]
$cases = [
    ['001_day_of_week.php', "18-04-2016", "Monday"],
    ['001_day_of_week.php', "27-11-1996", "Wednesday"],
    ['002_person.php', "Peter\nPan\n20", "firstName: Peter lastName: Pan age: 20"],
    ['003_songs.php', "3\nfavourite_DownTown_3:14\nlisten_Andalouse_3:24\nfavourite_In To The Night_3:58\nfavourite", "DownTown\nIn To The Night"],
    ['003_songs.php', "2\nlike_Replay_3:15\nban_Photoshop_3:48\nall", "Replay\nPhotoshop"],
    ['004_students.php', "John Smith 15 Sofia\nPeter Ivanov 14 Plovdiv\nLinda Bridge 16 Sofia\nSimon Stone 12 Varna\nend\nSofia", "John Smith is 15 years old.\nLinda Bridge is 16 years old."],
    ['005_students_2.php', "Peter Johnson 14 Sofia\nLinda Bridge 16 Sofia\nPeter Johnson 15 Sofia\nend\nSofia", "Peter Johnson is 15 years old.\nLinda Bridge is 16 years old."],
    ['006_store_boxes.php', "19861519 Dove 15 2.50\n86757035 Butter 7 3.20\n39393891 Orange 29 4.20\nend", "39393891\n-- Orange - \$4.20: 29\n-- \$121.80\n19861519\n-- Dove - \$2.50: 15\n-- \$37.50\n86757035\n-- Butter - \$3.20: 7\n-- \$22.40"],
    ['007_vehicle_catalogue.php', "Car/Audi/A3/110\nCar/Maserati/Levante/350\nTruck/Mercedes/Actros/9019\nCar/Porsche/Panamera/375\nend", "Cars:\nAudi: A3 - 110hp\nMaserati: Levante - 350hp\nPorsche: Panamera - 375hp\nTrucks:\nMercedes: Actros - 9019kg"],
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
