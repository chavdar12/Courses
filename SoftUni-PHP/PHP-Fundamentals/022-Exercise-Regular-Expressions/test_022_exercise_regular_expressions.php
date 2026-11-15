<?php
// Runs every script in this lesson with the example input from the course and checks its output.
// Usage: php test_022_exercise_regular_expressions.php

// [script, stdin, expected stdout]
// Santa's helper input: each message shifted forward by the key
$shift = fn(string $text, int $key) => implode('', array_map(fn($c) => chr(ord($c) + $key), str_split($text)));

$cases = [
    ['001_extract_emails.php', "Please contact us at: support@github.com.", "support@github.com"],
    ['001_extract_emails.php', "Just send email to s.miller@mit.edu and j.hopking@york.ac.uk for more information.", "s.miller@mit.edu\nj.hopking@york.ac.uk"],
    ['001_extract_emails.php', "Many users @ SoftUni confuse email addresses. We @ Softuni.BG provide high-quality training @ home or @ class. -- steve.parker@softuni.de.", "steve.parker@softuni.de"],
    ['002_furniture.php', ">>Sofa<<312.23!3\n>>TV<<300!5\n>Invalid<<!5\nPurchase", "Bought furniture:\nSofa\nTV\nTotal money spend: 2436.69"],
    ['002_furniture.php', ">Invalid<<!4\n>Invalid<<!2\n>Invalid<<!5\nPurchase", "Bought furniture:\nTotal money spend: 0.00"],
    ['003_race.php', "George, Peter, Bill, Tom\nG4e@55or%6g6!68e!!@\nR1@!3a\$y4456@\nB5@i@#123ll\nG@e54o\$r6ge#\n7P%et^#e5346r\nT\$o553m&6\nend of race", "1st place: George\n2nd place: Peter\n3rd place: Tom"],
    ['004_softuni_bar_income.php', "%George%<Croissant>|2|10.3\$\n%Peter%<Gum>|1|1.3\$\n%Maria%<Cola>|1|2.4\$\nend of shift", "George: Croissant - 20.60\nPeter: Gum - 1.30\nMaria: Cola - 2.40\nTotal income: 24.30"],
    ['004_softuni_bar_income.php', "%InvalidName%<Croissant>|2|10.3\$\n%Peter%<Gum>1.3\$\n%Maria%<Cola>|1|2.4\n%Valid%<Valid>valid|10|valid20\$\nend of shift", "Valid: Valid - 200.00\nTotal income: 200.00"],
    ['005_santas_secret_helper.php', "3\n" . $shift('xx@Kate#$!G!yy', 3) . "\n" . $shift('@Bob%!N!', 3) . "\n" . $shift('@Ann-x!G!', 3) . "\nend", "Kate"],
    ['006_winning_ticket.php', "Cash\$\$\$\$\$\$Ca\$\$\$\$\$\$sh", "ticket \"Cash\$\$\$\$\$\$Ca\$\$\$\$\$\$sh\" - 6\$"],
    ['006_winning_ticket.php', "\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$, aabb  , th@@@@@@eemo@@@@@@ey", "ticket \"\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$\" - 10\$ Jackpot!\ninvalid ticket\nticket \"th@@@@@@eemo@@@@@@ey\" - 6@"],
    ['006_winning_ticket.php', "validticketnomatch:(, ######aaaa\$\$\$\$\$\$aaaa", "ticket \"validticketnomatch:(\" - no match\nticket \"######aaaa\$\$\$\$\$\$aaaa\" - no match"],
    ['007_star_enigma.php', "2\nSTCDoghudd4=63333\$D\$0A53333\nEHfsytsnhf?8555&I&2C9555SR", "Attacked planets: 1\n-> Alderaa\nDestroyed planets: 1\n-> Cantonica"],
    ['008_nether_realms.php', "M3ph-0.5s-0.5t0.0**", "M3ph-0.5s-0.5t0.0** - 524 health, 8.00 damage"],
    ['008_nether_realms.php', "M3ph1st0**, Azazel", "Azazel - 615 health, 0.00 damage\nM3ph1st0** - 524 health, 16.00 damage"],
    ['008_nether_realms.php', "Gos/ho", "Gos/ho - 512 health, 0.00 damage"],
    ['009_extract_html_content.php', "<html><head><title>News</title></head><body><p><a href=\"https://softuni.bg\">Software University</a> aims to provide free training.</p></body></html>", "Title: News\nContent: Software University aims to provide free training."],
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
