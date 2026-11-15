<?php
$legendary = ['shards' => 'Shadowmourne', 'fragments' => 'Valanyr', 'motes' => 'Dragonwrath'];
$materials = ['shards' => 0, 'fragments' => 0, 'motes' => 0];
$junk = [];

while (($line = fgets(STDIN)) !== false) {
    $parts = preg_split('/\s+/', trim($line), -1, PREG_SPLIT_NO_EMPTY);
    for ($i = 0; $i + 1 < count($parts); $i += 2) {
        $quantity = intval($parts[$i]);
        $material = strtolower($parts[$i + 1]);
        if (!isset($materials[$material])) {
            $junk[$material] = ($junk[$material] ?? 0) + $quantity;
            continue;
        }
        $materials[$material] += $quantity;
        if ($materials[$material] >= 250) {
            $materials[$material] -= 250;
            echo "{$legendary[$material]} obtained!\n";
            break 2;
        }
    }
}

// key materials by quantity desc then name, junk by name
uksort($materials, fn($a, $b) => [$materials[$b], $a] <=> [$materials[$a], $b]);
foreach ($materials as $material => $quantity) {
    echo "$material: $quantity\n";
}
ksort($junk);
foreach ($junk as $material => $quantity) {
    echo "$material: $quantity\n";
}
