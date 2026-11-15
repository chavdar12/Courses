<?php
// Runs every script in this lesson with the example input from the course and checks its output.
// Usage: php test_013_exercise_encapsulation_and_inheritance.php

// [script, stdin, expected stdout]
$cases = [
    ['001_class_box.php', "2\n3\n4", "Surface Area - 52.00\nLateral Surface Area - 40.00\nVolume - 24.00"],
    ['001_class_box.php', "-3\n1\n1", "Length cannot be zero or negative !"],
    ['002_person_and_child.php', "Pesho\n12", "Child: Pesho, 12 years old"],
    ['002_person_and_child.php', "Pesho\n17", "Child's age must be less than 16!"],
    ['002_person_and_child.php', "Al\n10", "Name's length should not be less than 3 symbols!"],
    ['003_book_shop.php', "Ivo Andric\nNa Drinata most\n15\nSTANDARD", "OK\n15"],
    ['003_book_shop.php', "Ivo Andric\nNa Drinata most\n15\nGOLD", "OK\n19.5"],
    ['003_book_shop.php', "Ivo 4ndric\nNa Drinata most\n15\nSTANDARD", "Author not valid!"],
    ['004_mankind.php', "Ivan Ivanov 08\nPesho Kirov 1590 10", "Invalid faculty number!"],
    ['004_mankind.php', "Stefo Mk321 0812111\nIvcho Ivancov 1590 10", "First Name: Stefo\nLast Name: Mk321\nFaculty number: 0812111\n\nFirst Name: Ivcho\nLast Name: Ivancov\nWeek Salary: 1590.00\nHours per day: 10.00\nSalary per hour: 22.71"],
    ['005_shopping_spree.php', "Pesho=11;Gosho=4\nBread=10;Milk=2;\nPesho Bread\nGosho Milk\nGosho Milk\nPesho Milk\nEND", "Pesho bought Bread\nGosho bought Milk\nGosho bought Milk\nPesho can't afford Milk\nPesho - Bread\nGosho - Milk, Milk"],
    ['005_shopping_spree.php', "Mimi=0\nKafence=2\nMimi Kafence\nEND", "Mimi can't afford Kafence\nMimi - Nothing bought"],
    ['006_cat_lady/main.php', "StreetExtraordinaire Maca 85\nSiamese Sim 4\nCymric Tom 41\nEnd\nTom", "Cymric Tom 41"],
    ['006_cat_lady/main.php', "Siamese Sim 4\nEnd\nTom", "Cat not found!"],
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
