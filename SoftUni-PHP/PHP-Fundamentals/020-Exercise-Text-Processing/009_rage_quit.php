<?php

$input = trim(fgets(STDIN));
$pattern = '/(\D+)(\d+)/';

preg_match_all($pattern, $input, $matches);

$uniqueSymbols = [];
$rageMessage = '';

foreach ($matches[1] as $index => $str) {
    $times = intval($matches[2][$index]);
    $rageMessage .= str_repeat(strtoupper($str), $times);
    if ($times === 0) {
        continue;
    }
    foreach (str_split(strtoupper($str)) as $char) {
        $uniqueSymbols[$char] = true;
    }
}

echo "Unique symbols used: " . count($uniqueSymbols) . PHP_EOL;
echo $rageMessage;
