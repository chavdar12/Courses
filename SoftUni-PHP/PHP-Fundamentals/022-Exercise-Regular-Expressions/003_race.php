<?php
$participants = explode(', ', trim(fgets(STDIN)));
$distances = [];

while (true) {
    $input = trim(fgets(STDIN));
    if ($input === "end of race") {
        break;
    }

    $name = preg_replace('/[^A-Za-z]/', '', $input);
    $distance = array_sum(array_map('intval', str_split(preg_replace('/[^0-9]/', '', $input))));

    if (in_array($name, $participants)) {
        if (!isset($distances[$name])) {
            $distances[$name] = 0;
        }
        $distances[$name] += $distance;
    }
}

arsort($distances);
$places = ['1st', '2nd', '3rd'];
foreach (array_slice(array_keys($distances), 0, 3) as $rank => $name) {
    echo "{$places[$rank]} place: {$name}\n";
}
?>