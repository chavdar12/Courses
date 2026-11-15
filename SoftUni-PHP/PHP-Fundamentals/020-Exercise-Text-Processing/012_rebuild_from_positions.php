<?php
$string = [];
while (true) {
    $line = trim(fgets(STDIN));
    if ($line === "end") {
        break;
    }

    $parts = explode(":", $line);
    $char = $parts[0];
    $indexes = explode("/", $parts[1]);

    foreach ($indexes as $index) {
        $string[$index] = $char;
    }
}

ksort($string);
echo implode("", $string) . "\n";
?>