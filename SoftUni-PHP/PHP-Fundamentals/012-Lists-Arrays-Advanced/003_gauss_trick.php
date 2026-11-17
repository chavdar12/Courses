<?php

$arr = array_map('intval', explode(' ', trim(fgets(STDIN))));
$result = [];
$count = count($arr);
for ($i = 0; $i < intdiv($count, 2); $i++) {
    $result[] = $arr[$i] + $arr[$count - 1 - $i];
}
if ($count % 2 === 1) {
    $result[] = $arr[intdiv($count, 2)];
}
echo implode(' ', $result);
