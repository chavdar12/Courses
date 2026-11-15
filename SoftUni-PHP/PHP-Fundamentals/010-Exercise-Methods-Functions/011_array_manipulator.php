<?php
function exchange(array $array, int $index): array
{
    if ($index < 0 || $index >= count($array)) {
        echo "Invalid index" . PHP_EOL;
        return $array;
    }
    return array_merge(array_slice($array, $index + 1), array_slice($array, 0, $index + 1));
}

function matching(array $array, string $type): array
{
    $remainder = $type === 'even' ? 0 : 1;
    return array_filter($array, fn($n) => abs($n % 2) === $remainder);
}

// index of the max/min even/odd element; the rightmost one wins a tie
function extremeIndex(array $array, string $kind, string $type): void
{
    $matches = matching($array, $type);
    if (!$matches) {
        echo "No matches" . PHP_EOL;
        return;
    }
    $target = $kind === 'max' ? max($matches) : min($matches);
    echo max(array_keys($matches, $target)) . PHP_EOL;
}

function firstOrLast(array $array, string $side, int $count, string $type): void
{
    if ($count > count($array)) {
        echo "Invalid count" . PHP_EOL;
        return;
    }
    $matches = array_values(matching($array, $type));
    $picked = $side === 'first'
        ? array_slice($matches, 0, $count)
        : array_slice($matches, max(0, count($matches) - $count));
    echo "[" . implode(", ", $picked) . "]" . PHP_EOL;
}

$array = array_map('intval', explode(' ', trim(fgets(STDIN))));

while (($line = trim(fgets(STDIN))) !== 'end') {
    $tokens = explode(' ', $line);
    switch ($tokens[0]) {
        case 'exchange':
            $array = exchange($array, intval($tokens[1]));
            break;
        case 'max':
        case 'min':
            extremeIndex($array, $tokens[0], $tokens[1]);
            break;
        case 'first':
        case 'last':
            firstOrLast($array, $tokens[0], intval($tokens[1]), $tokens[2]);
            break;
    }
}

echo "[" . implode(", ", $array) . "]" . PHP_EOL;
