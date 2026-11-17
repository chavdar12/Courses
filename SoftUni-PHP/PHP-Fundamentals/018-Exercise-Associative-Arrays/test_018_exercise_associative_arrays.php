<?php

// Runs every script in this lesson with the example input from the course and checks its output.
// Usage: php test_018_exercise_associative_arrays.php

// [script, stdin, expected stdout]
$cases = [
    ['001_a_miner_task.php', "Gold\n155\nSilver\n10\nCopper\n17\nstop", "Gold -> 155 K\nSilver -> 10 K\nCopper -> 17 K"],
    ['001_a_miner_task.php', "gold\n155\nsilver\n10\ncopper\n17\ngold\n15\nstop", "gold -> 170 K\nsilver -> 10 K\ncopper -> 17 K"],
    ['002_student_academy.php', "5\nJohn\n5.5\nJohn\n4.5\nAlice\n6\nAlice\n3\nGeorge\n5", "John -> 5.00\nGeorge -> 5.00\nAlice -> 4.50"],
    ['003_courses.php', "Programming Fundamentals : John Smith\nProgramming Fundamentals : Linda Johnson\nJS Core : Will Wilson\nJava Advanced : Harrison White\nend", "Programming Fundamentals: 2\n-- John Smith\n-- Linda Johnson\nJS Core: 1\n-- Will Wilson\nJava Advanced: 1\n-- Harrison White"],
    ['004_hands_of_cards.php', "Peter: 2C, 4H, 9H, AS, QS\nTomas: 3H, 10S, JC, KD, 5S, 10S\nAndrea: QH, QC, QS, QD\nTomas: 6H, 7S, KC, KD, 5S, 10C\nAndrea: QH, QC, JS, JD, JC\nPeter: JD, JD, JD, JD, JD, JD\nJOKER", "Peter: 167\nTomas: 175\nAndrea: 197"],
    ['005_softuni_parking.php', "5\nregister John CS1234JS\nregister George JAVA123S\nregister Andy AB4142CD\nregister Jesica VR1223EE\nunregister Andy", "John registered CS1234JS successfully\nGeorge registered JAVA123S successfully\nAndy registered AB4142CD successfully\nJesica registered VR1223EE successfully\nAndy unregistered successfully\nJohn => CS1234JS\nGeorge => JAVA123S\nJesica => VR1223EE"],
    ['005_softuni_parking.php', "4\nregister Jony AA4132BB\nregister Jony AA4132BB\nunregister Andy\nregister Linda AA9999BB", "Jony registered AA4132BB successfully\nERROR: already registered with plate number AA4132BB\nERROR: user Andy not found\nLinda registered AA9999BB successfully\nJony => AA4132BB\nLinda => AA9999BB"],
    ['006_company_users.php', "SoftUni -> AA12345\nSoftUni -> BB12345\nMicrosoft -> CC12345\nHP -> BB12345\nEnd", "HP\n-- BB12345\nMicrosoft\n-- CC12345\nSoftUni\n-- AA12345\n-- BB12345"],
    ['006_company_users.php', "SoftUni -> AA12345\nSoftUni -> CC12344\nLenovo -> XX23456\nSoftUni -> AA12345\nMovement -> DD11111\nEnd", "Lenovo\n-- XX23456\nMovement\n-- DD11111\nSoftUni\n-- AA12345\n-- CC12344"],
    ['007_legendary_farming.php', "3 Motes 5 stones 5 Shards\n6 leathers 255 fragments 7 Shards", "Valanyr obtained!\nfragments: 5\nshards: 5\nmotes: 3\nleathers: 6\nstones: 5"],
    ['007_legendary_farming.php', "123 silver 6 shards 8 shards 5 motes\n9 fangs 75 motes 103 MOTES 8 Shards\n86 Motes 7 stones 19 silver", "Dragonwrath obtained!\nshards: 22\nmotes: 19\nfragments: 0\nfangs: 9\nsilver: 123"],
    ['008_orders.php', "Beer 2.20 100\nIceTea 1.50 50\nNukaCola 3.30 80\nWater 1.00 500\nbuy", "Beer -> 220.00\nIceTea -> 75.00\nNukaCola -> 264.00\nWater -> 500.00"],
    ['008_orders.php', "CesarSalad 10.20 25\nSuperEnergy 0.80 400\nBeer 1.35 350\nIceCream 1.50 25\nbuy", "CesarSalad -> 255.00\nSuperEnergy -> 320.00\nBeer -> 472.50\nIceCream -> 37.50"],
    ['009_force_book.php', "Light | Peter\nDark | Kim\nLight | Kim\nLumpawaroo", "Side: Dark, Members: 1\n! Kim\nSide: Light, Members: 1\n! Peter"],
    ['009_force_book.php', "Lighter | Royal\nDarker | DCay\nIvan Ivanov -> Lighter\nDCay -> Lighter\nLumpawaroo", "Ivan Ivanov joins the Lighter side!\nDCay joins the Lighter side!\nSide: Lighter, Members: 3\n! DCay\n! Ivan Ivanov\n! Royal"],
    ['010_softuni_exam_results.php', "Peter-Java-84\nGeorge-C#-84\nGeorge-C#-94\nKaty-C#-90\nexam finished", "Results:\nGeorge | 94\nKaty | 90\nPeter | 84\nSubmissions:\nC# - 3\nJava - 1"],
    ['010_softuni_exam_results.php', "Peter-Java-91\nGeorge-C#-84\nKaty-Java-90\nKaty-C#-50\nKaty-banned\nexam finished", "Results:\nPeter | 91\nGeorge | 84\nSubmissions:\nC# - 2\nJava - 2"],
    ['011_juice_bottles.php', "Orange => 2000\nPeach => 1432\nBanana => 450\nPeach => 600\nStrawberry => 549\nEnd", "Orange => 2\nPeach => 2"],
    ['012_store_catalogue.php', "8\nAppricot : 20.4\nFridge : 1500\nTV : 1499\nDeodorant : 10\nBoiler : 300\nApple : 1.25\nAnti-Bug Spray : 15\nT-Shirt : 10", "A\n  Anti-Bug Spray: 15\n  Apple: 1.25\n  Appricot: 20.4\nB\n  Boiler: 300\nD\n  Deodorant: 10\nF\n  Fridge: 1500\nT\n  T-Shirt: 10\n  TV: 1499"],
    ['013_moba_challenger.php', "Peter -> Adc -> 400\nGeorge -> Jungle -> 300\nSimon -> Mid -> 200\nSimon -> Support -> 250\nSeason end", "Simon: 450 skill\n- Support <::> 250\n- Mid <::> 200\nPeter: 400 skill\n- Adc <::> 400\nGeorge: 300 skill\n- Jungle <::> 300"],
    ['013_moba_challenger.php', "Peter -> Adc -> 400\nBush -> Tank -> 150\nFaker -> Mid -> 200\nFaker -> Support -> 250\nFaker -> Tank -> 250\nPeter vs Faker\nFaker vs Bush\nFaker vs Hide\nSeason end", "Faker: 700 skill\n- Support <::> 250\n- Tank <::> 250\n- Mid <::> 200\nPeter: 400 skill\n- Adc <::> 400"],
    ['014_snowwhite.php', "Peter <:> Red <:> 2000\nTony <:> Blue <:> 1000\nGeorge <:> Green <:> 1000\nSimon <:> Yellow <:> 4500\nDopey <:> Blue <:> 1000\nOnce upon a time", "(Yellow) Simon <-> 4500\n(Red) Peter <-> 2000\n(Blue) Tony <-> 1000\n(Blue) Dopey <-> 1000\n(Green) George <-> 1000"],
    ['015_dragon_army.php', "5\nRed Bazgargal 100 2500 25\nBlack Dargonax 200 3500 18\nRed Obsidion 220 2200 35\nBlue Kerizsa 60 2100 20\nBlue Algordox 65 1800 50", "Red::(160.00/2350.00/30.00)\n-Bazgargal -> damage: 100, health: 2500, armor: 25\n-Obsidion -> damage: 220, health: 2200, armor: 35\nBlack::(200.00/3500.00/18.00)\n-Dargonax -> damage: 200, health: 3500, armor: 18\nBlue::(62.50/1950.00/35.00)\n-Algordox -> damage: 65, health: 1800, armor: 50\n-Kerizsa -> damage: 60, health: 2100, armor: 20"],
    ['015_dragon_army.php', "2\nRed Smaug null null null\nRed Smaug 10 null 5", "Red::(10.00/250.00/5.00)\n-Smaug -> damage: 10, health: 250, armor: 5"],
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
