<?php
// Runs every script in this lesson with the example input from the course and checks its output.
// Usage: php test_..php

// [script, stdin, expected stdout]
$cases = [
    ['001_ages.php', "20", "adult"],
    ['001_ages.php', "1", "baby"],
    ['001_ages.php', "100", "elder"],
    ['002_division.php', "30", "The number is divisible by 10"],
    ['002_division.php', "15", "The number is divisible by 3"],
    ['002_division.php', "12", "The number is divisible by 6"],
    ['002_division.php', "1643", "Not divisible"],
    ['003_vacation.php', "30\nStudents\nSunday", "Total price: 266.73"],
    ['003_vacation.php', "40\nRegular\nSaturday", "Total price: 800.00"],
    ['004_print_and_sum.php', "5\n10", "5 6 7 8 9 10\nSum: 45"],
    ['004_print_and_sum.php', "0\n26", implode(" ", range(0, 26)) . "\nSum: 351"],
    ['005_login.php', "Acer\nlogin\ngo\nlet me in\nrecA", "Incorrect password. Try again.\nIncorrect password. Try again.\nIncorrect password. Try again.\nUser Acer logged in."],
    ['005_login.php', "sunny\nrainy\ncloudy\nsunny\nnot sunny", "Incorrect password. Try again.\nIncorrect password. Try again.\nIncorrect password. Try again.\nUser sunny blocked!"],
    ['006_strong_number.php', "2", "yes"],
    ['006_strong_number.php', "145", "yes"],
    ['006_strong_number.php', "1230", "no"],
    ['007_vending_machine.php', "1\n1\n0.5\n0.6\nStart\nCoke\nSoda\nCrisps\nEnd", "Cannot accept 0.6\nPurchased Coke\nPurchased Soda\nSorry, not enough money\nChange: 0.70"],
    ['007_vending_machine.php', "1\nStart\nNuts\nCoke\nEnd", "Sorry, not enough money\nPurchased Coke\nChange: 0.00"],
    ['008_triangle_of_numbers.php', "3", "1\n1 2\n1 2 3"],
    ['009_padawan_equipment.php', "100\n2\n1.0\n2.0\n3.0", "The money is enough - it would cost 13.00lv."],
    ['009_padawan_equipment.php', "100\n42\n12.0\n4.0\n3.0", "Ivan Cho will need 737.00lv more."],
    ['010_rage_expenses.php', "7\n2\n3\n4\n5", "Rage expenses: 16.00 lv."],
    ['010_rage_expenses.php', "23\n12.50\n21.50\n40\n200", "Rage expenses: 608.00 lv."],
    ['011_cookie_factory.php', "2\n14000\n8000\n2000\n100\n100\n100", "Boxes of cookies: 48\nIngredients are not enough for a box of cookies.\nTotal boxes: 48"],
    ['012_sort_numbers.php', "2\n1\n3", "3\n2\n1"],
    ['012_sort_numbers.php', "-2\n1\n3", "3\n1\n-2"],
    ['013_english_name_of_last_digit.php', "512", "two"],
    ['013_english_name_of_last_digit.php', "1643", "three"],
    ['014_game_store.php', "120\nRoverWatch\nHonored 2\nGame Time", "Bought RoverWatch\nBought Honored 2\nTotal spent: $89.98. Remaining: $30.02"],
    ['014_game_store.php', "19.99\nReimen origin\nRoverWatch\nZplinter Zell\nGame Time", "Not Found\nToo Expensive\nBought Zplinter Zell\nOut of money!"],
    ['015_reverse_string.php', "Hello", "olleH"],
    ['016_messages.php', "44 33 555 555 666", "hello"],
];

function run(string $script, string $stdin): array
{
    // warnings go to stderr so a noisy script fails its case instead of polluting stdout
    $command = [PHP_BINARY, '-d', 'display_errors=stderr', '-d', 'error_reporting=E_ALL', $script];
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
    if ($code === 0 && $stderr === '' && normalize($stdout) === normalize($expected)) {
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
