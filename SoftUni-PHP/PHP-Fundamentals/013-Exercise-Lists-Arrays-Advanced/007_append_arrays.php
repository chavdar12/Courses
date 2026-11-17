<?php

$groups = array_reverse(explode('|', trim(fgets(STDIN))));
$result = [];
foreach ($groups as $group) {
    $result = array_merge($result, preg_split('/\s+/', $group, -1, PREG_SPLIT_NO_EMPTY));
}
echo implode(' ', $result) . PHP_EOL;
