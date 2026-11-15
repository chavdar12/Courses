<?php
// Runs every script in this lesson with the example input from the course and checks its output.
// Usage: php test_..php

// [script, stdin, expected stdout]
$cases = [
    ['001_train.php', "32 54 21 12 4 0 23\n75\nAdd 10\nAdd 0\n30\n10\n75\nend", "72 54 21 12 4 75 23 10 0"],
    ['001_train.php', "0 0 0 10 2 4\n10\nAdd 10\n10\n10\n10\n8\n6\nend", "10 10 10 10 10 10 10"],
    ['002_change_list.php', "1 2 3 4 5 5 5 6\nDelete 5\nInsert 10 1\nDelete 5\nOdd", "1 3"],
    ['002_change_list.php', "20 12 4 319 21 31234 2 41 23 4\nInsert 50 2\nInsert 50 5\nDelete 4\nEven", "20 12 50 50 31234 2"],
    ['003_house_party.php', "4\nAllie is going!\nGeorge is going!\nJohn is not going!\nGeorge is not going!", "John is not in the list!\nAllie"],
    ['003_house_party.php', "5\nTom is going!\nAnnie is going!\nTom is going!\nGarry is going!\nJerry is going!", "Tom is already in the list!\nTom\nAnnie\nGarry\nJerry"],
    ['004_list_operations.php', "1 23 29 18 43 21 20\nAdd 5\nRemove 5\nShift left 3\nShift left 1\nEnd", "43 20 5 1 23 29 18"],
    ['004_list_operations.php', "5 12 42 95 32 1\nInsert 3 0\nRemove 10\nInsert 8 6\nShift right 1\nShift left 2\nEnd", "Invalid index\n5 12 42 95 32 8 1 3"],
    ['005_bomb_numbers.php', "1 2 2 4 2 2 2 9\n4 2", "12"],
    ['005_bomb_numbers.php', "1 4 4 2 8 9 1\n9 3", "5"],
    ['005_bomb_numbers.php', "1 7 7 1 2 3\n7 1", "6"],
    ['005_bomb_numbers.php', "1 1 2 1 1 1 2 1 1 1\n2 1", "4"],
    ['006_cards_game.php', "20 30 40 50\n10 20 30 40", "First player wins! Sum: 240"],
    ['006_cards_game.php', "10 20 30 40 50\n50 40 30 30 10", "Second player wins! Sum: 50"],
    ['007_append_arrays.php', "1 2 3 |4 5 6 |  7  8", "7 8 4 5 6 1 2 3"],
    ['007_append_arrays.php', "7 | 4  5|1 0| 2 5 |3", "3 2 5 1 0 4 5 7"],
    ['008_anonymous_threat.php', "Ivo Johny Tony Bony Mony\nmerge 0 3\nmerge 3 4\nmerge 0 3\n3:1", "IvoJohnyTonyBonyMony"],
    ['008_anonymous_threat.php', "abcd efgh ijkl mnop qrst uvwx yz\nmerge 4 10\ndivide 4 5\n3:1", "abcd efgh ijkl mnop qr st uv wx yz"],
    ['008_anonymous_threat.php', "abcdefg\ndivide 0 3\n3:1", "ab cd efg"],
    ['009_pokemon_dont_go.php', "4 5 3\n1\n1\n0", "14"],
    ['009_pokemon_dont_go.php', "5 10 6 3 5\n2\n4\n1\n1\n3\n0\n0", "51"],
    ['010_softuni_course_planning.php', "Data Types, Objects, Lists\nAdd:Databases\nInsert:Arrays:0\nRemove:Lists\ncourse start", "1.Arrays\n2.Data Types\n3.Objects\n4.Databases"],
    ['010_softuni_course_planning.php', "Arrays, Lists, Methods\nSwap:Arrays:Methods\nExercise:Databases\nSwap:Lists:Databases\nInsert:Arrays:0\ncourse start", "1.Methods\n2.Databases\n3.Databases-Exercise\n4.Arrays\n5.Lists"],
    ['011_array_modifier.php', "23 -2 321 87 42 90 -123\nswap 1 3\nswap 3 6\nswap 1 0\nmultiply 1 2\nmultiply 2 1\ndecrease\nend", "86, 7382, 2369942, -124, 41, 89, -3"],
    ['011_array_modifier.php', "1 2 3 4\nswap 0 1\nswap 1 2\nswap 2 3\nmultiply 1 2\ndecrease\nend", "1, 11, 3, 0"],
    ['012_list_commands.php', "Add 1\nAdd 2\nPush 0\nPop\nAdd 3\nEnqueue\nPrint", "1 2"],
    ['013_car_race.php', "29 13 9 0 13 0 21 0 14 82 12", "The winner is left with total time: 53.8"],
    ['013_car_race.php', "10 20 30 0 0 50 1 1 1", "The winner is left with total time: 48.0"],
    ['014_drum_set.php', "1000.00\n58 65 33\n11\n12\nHit it again, Gabsy!", "35 42 10\nGabsy has 1000.00lv."],
    ['014_drum_set.php', "154.00\n20 40 30 50\n40\nHit it again, Gabsy!", "20 30 10\nGabsy has 4.00lv."],
    ['015_take_skip_rope.php', "T2exs15ti23ng1", "Testing"],
    ['015_take_skip_rope.php', "O{1ne1T2021wf312o13Th111xreve!!@!", "OneTwoThree!!!"],
    ['016_mixed_up_lists.php', "1 5 23 64 2 3 34 54 12\n43 23 12 31 54 51 92", "23 23 31 34 43 51"],
    ['016_mixed_up_lists.php', "1 15\n10 20 5 30", "15"],
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
