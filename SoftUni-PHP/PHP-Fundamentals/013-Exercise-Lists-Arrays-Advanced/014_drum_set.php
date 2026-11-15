<?php
$savings = floatval(fgets(STDIN));
$initial = array_map('intval', explode(" ", trim(fgets(STDIN))));
$drums = $initial;
while (($command = trim(fgets(STDIN))) !== "Hit it again, Gabsy!") {
    $hitPower = intval($command);
    foreach ($drums as $i => $quality) {
        $drums[$i] = $quality - $hitPower;
        if ($drums[$i] > 0) {
            continue;
        }
        // a broken drum is replaced for 3x its starting quality, or dropped if there is no money
        $price = $initial[$i] * 3;
        if ($savings >= $price) {
            $savings -= $price;
            $drums[$i] = $initial[$i];
        } else {
            unset($drums[$i], $initial[$i]);
        }
    }
}
echo implode(" ", $drums) . "\n";
echo "Gabsy has " . number_format($savings, 2, ".", "") . "lv.\n";
