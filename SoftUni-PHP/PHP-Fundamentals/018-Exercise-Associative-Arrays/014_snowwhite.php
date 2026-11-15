<?php
// a dwarf is identified by name and hat colour together
$dwarfs = [];
while (($input = trim(fgets(STDIN))) !== "Once upon a time") {
    list($name, $hatColor, $physics) = explode(" <:> ", $input);
    $key = "$hatColor|$name";
    $dwarfs[$key] = max($dwarfs[$key] ?? 0, intval($physics));
}

$colorCounts = array_count_values(array_map(fn($key) => explode('|', $key)[0], array_keys($dwarfs)));
$colorOf = fn($key) => explode('|', $key)[0];

// highest physics first, then the more common hat colour; otherwise input order
uksort($dwarfs, fn($a, $b) => [$dwarfs[$b], $colorCounts[$colorOf($b)]] <=> [$dwarfs[$a], $colorCounts[$colorOf($a)]]);

foreach ($dwarfs as $key => $physics) {
    list($hatColor, $name) = explode('|', $key);
    echo "({$hatColor}) {$name} <-> {$physics}\n";
}
