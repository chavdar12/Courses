<?php

// Runs every script in this lesson with the example input from the course and checks its output.
// Usage: php test_016_exercise_objects_and_classes.php

// [script, stdin, expected stdout]
$cases = [
    ['001_order_by_age.php', "George 123456 20\nPeter 78911 15\nStephen 524244 10\nEnd", "Stephen with ID: 524244 is 10 years old.\nPeter with ID: 78911 is 15 years old.\nGeorge with ID: 123456 is 20 years old."],
    ['002_average_grades.php', "3\nGeorge 5.20 3.20\nRiki 5.20 6.00\nAnna 6.00 5.00", "Anna -> 5.50\nRiki -> 5.60"],
    ['003_book_library.php', "5\nLOTR Tolkien GeorgeAllen 29.07.1954 0395082999 30.00\nHobbit Tolkien GeorgeAllen 21.09.1937 0395082888 10.25\nHP1 JKRowling Bloomsbury 26.06.1997 0395082777 15.50\nHP7 JKRowling Bloomsbury 21.07.2007 0395082666 20.00\nAC Christie Collins 01.01.1931 0395082555 35.50", "Tolkien -> 40.25\nChristie -> 35.50\nJKRowling -> 35.50"],
    ['004_articles.php', "some title, some content, some author\n3\nEdit: better content\nChangeAuthor: better author\nRename: better title", "better title - better content: better author"],
    ['004_articles.php', "Fight, Nothing, Peter\n1\nRename: Fight Club", "Fight Club - Nothing: Peter"],
    ['005_articles_2.php', "2\nScience, planets, Bill\nCiao, food, Ann\ntitle", "Ciao - food: Ann\nScience - planets: Bill"],
    ['005_articles_2.php', "2\nScience, planets, Bill\nCiao, food, Ann\nauthor", "Ciao - food: Ann\nScience - planets: Bill"],
    ['006_user_dates_and_comments.php', "Peter 10.05.2018 12.05.2018\nAnna 01.01.2018\nend of dates\nPeter-Nice talk\nPeter-See you\nend of comments", "Anna Comments:\nDates attended: -- 01.01.2018\nPeter Comments: - Nice talk - See you\nDates attended: -- 10.05.2018\n-- 12.05.2018"],
    ['007_teamwork_projects.php', "2\nDidi-PowerPuffsCoders\nToni-Toni is the best\nPetq->PowerPuffsCoders\nToni->Toni is the best\nend of assignment", "Team PowerPuffsCoders has been created by Didi!\nTeam Toni is the best has been created by Toni!\nMember Toni cannot join team Toni is the best!\nPowerPuffsCoders\n- Didi\n-- Petq\nTeams to disband:\nToni is the best"],
    ['007_teamwork_projects.php', "3\nTatyana-CloneClub\nHelena-CloneClub\nTrifon-AiNaBira\nPesho->aiNaBira\nPesho->AiNaBira\nTatyana->Leda\nPesho->AiNaBira\nCossima->CloneClub\nend of assignment", "Team CloneClub has been created by Tatyana!\nTeam CloneClub was already created!\nTeam AiNaBira has been created by Trifon!\nTeam aiNaBira does not exist!\nTeam Leda does not exist!\nMember Pesho cannot join team AiNaBira!\nAiNaBira\n- Trifon\n-- Pesho\nCloneClub\n- Tatyana\n-- Cossima\nTeams to disband:"],
    ['008_oldest_family_member.php', "3\nPeter 3\nGeorge 4\nAnna 5", "Anna 5"],
    ['009_speed_racing.php', "2\nAudiA4 23 0.3\nBMW-M2 45 0.42\nDrive BMW-M2 56\nDrive AudiA4 5\nDrive AudiA4 13\nEnd", "AudiA4 17.60 18\nBMW-M2 21.48 56"],
    ['009_speed_racing.php', "1\nOpel 10 1\nDrive Opel 20\nEnd", "Insufficient fuel for the drive\nOpel 10.00 0"],
    ['010_raw_data.php', "2\nChevroletAstro 200 180 900 fragile\nCitroen2CV 190 165 1200 fragile\nfragile", "ChevroletAstro"],
    ['010_raw_data.php', "2\nFerrari 300 400 50 flamable\nFiat 120 90 50 flamable\nflamable", "Ferrari"],
    ['011_shopping_spree.php', "Peter=11;George=4\nBread=10;Milk=2\nPeter Bread\nGeorge Milk\nGeorge Milk\nPeter Milk\nEND", "Peter bought Bread\nGeorge bought Milk\nGeorge bought Milk\nPeter can't afford Milk\nPeter - Bread\nGeorge - Milk, Milk"],
    ['011_shopping_spree.php', "Mimi=0\nKafence=2\nMimi Kafence\nEND", "Mimi can't afford Kafence\nMimi - Nothing bought"],
    ['012_company_roster.php', "4\nPeter 120.00 Dev\nTony 333.33 Marketing\nGeorge 0 Marketing\nAnna 4.6 Dev", "Highest Average Salary: Marketing\nTony 333.33\nGeorge 0.00"],
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
