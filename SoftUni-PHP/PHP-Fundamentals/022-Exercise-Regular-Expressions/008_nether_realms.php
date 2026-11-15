<?php

$demons = preg_split('/\s*,\s*/', trim(fgets(STDIN)), -1, PREG_SPLIT_NO_EMPTY);

// health: sum of every char that is not a digit or one of + - * / .
function calculateHealth(string $name): int
{
    return array_sum(array_map('ord', str_split(preg_replace('/[\d+\-*\/.]/', '', $name) ?: '')));
}

// damage: sum of all numbers, doubled per '*' and halved per '/'
function calculateDamage(string $name): float
{
    preg_match_all('/-?\d+(?:\.\d+)?/', $name, $matches);
    $damage = array_sum(array_map('floatval', $matches[0]));
    return $damage * 2 ** substr_count($name, '*') / 2 ** substr_count($name, '/');
}

sort($demons);
foreach ($demons as $demon) {
    echo "{$demon} - " . calculateHealth($demon) . " health, "
        . number_format(calculateDamage($demon), 2, '.', '') . " damage\n";
}
