<?php

// Runs every script in this lesson with the example input from the course and checks its output.
// Usage: php test_..php

// [script, stdin, expected stdout]
$cases = [
    ['001_valid_usernames.php', "sh, too_long_username, !lleg@l ch@rs, jeffbutt", "jeffbutt"],
    ['001_valid_usernames.php', "Jeff, john45, ab, cd, peter-ivanov, @smith", "Jeff\njohn45\npeter-ivanov"],
    ['002_character_multiplier.php', "Gosho Pesho", "53253"],
    ['002_character_multiplier.php', "123 522", "7647"],
    ['002_character_multiplier.php', "a aaaa", "9700"],
    ['003_extract_file.php', "C:\\Internal\\training-internal\\Template.pptx", "File name: Template\nFile extension: pptx"],
    ['003_extract_file.php', "C:\\Projects\\Data-Structures\\LinkedList.cs", "File name: LinkedList\nFile extension: cs"],
    ['004_caesar_cipher.php', "Programming is cool!", "Surjudpplqj#lv#frro\$"],
    ['004_caesar_cipher.php', "One year has 365 days.", "Rqh#|hdu#kdv#698#gd|v1"],
    ['005_multiply_big_number.php', "923847238931983192462832102\n4", "3695388955727932769851328408"],
    ['005_multiply_big_number.php', "9999\n9", "89991"],
    ['005_multiply_big_number.php', "123\n0", "0"],
    ['006_replace_repeating_chars.php', "aaaaabbbbbcdddeeeedssaa", "abcdedsa"],
    ['006_replace_repeating_chars.php', "qqqwerqwecccwd", "qwerqwecwd"],
    ['007_string_explosion.php', "abv>1>1>2>2asdasd", "abv>>>>dasd"],
    ['007_string_explosion.php', "pesho>2sis>1a>2akarate>4hexmaster", "pesho>is>a>karate>master"],
    ['008_letters_change_numbers.php', "A12b s17G", "330.00"],
    ['008_letters_change_numbers.php', "P34562Z q2576f   H456z", "46015.13"],
    ['008_letters_change_numbers.php', "a1A", "0.00"],
    ['009_rage_quit.php', "a3", "Unique symbols used: 1\nAAA"],
    ['009_rage_quit.php', "aSd2&5s@1", "Unique symbols used: 5\nASDASD&&&&&S@"],
    ['010_sum_of_letters.php', "HelloFromMyAwesomePROGRAM\nUPPERCASE", "The total sum is: " . array_sum(array_map('ord', str_split('HFMAPROGRAM')))],
    ['010_sum_of_letters.php', "AC/DC\nLOWERCASE", "The total sum is: 0"],
    ['011_letter_positions.php', "abcadba", "a:0/3/6 b:1/5 c:2 d:4"],
    ['012_rebuild_from_positions.php', "d:4\na:0/3/6\nc:2\nb:1/5\nend", "abcadba"],
    ['013_ascii_sumator.php', ".\n@\ndsg12gr5653feee5", "363"],
    ['013_ascii_sumator.php', "?\nE\n@ABCEF", "262"],
    ['014_treasure_finder.php', "1 2 1 3\nikegfp'jpne)bv=41P83X@\nujfufKt)Tkmyft'duEprsfjqbvfv=53V55XA\nfind", "Found gold at 10N70W\nFound Silver at 32S43W"],
    ['015_melrah_shake.php', "astalavista baby\nsta", "Shaked it.\nNo shake.\nalavi baby"],
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
