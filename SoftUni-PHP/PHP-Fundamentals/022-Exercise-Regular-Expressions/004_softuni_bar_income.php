<?php
$income = 0;
while (true) {
    $input = trim(fgets(STDIN));
    if ($input === "end of shift") {
        break;
    }

    // any junk except |$%. may sit between the fields
    $pattern = '/%([A-Z][a-z]+)%[^|$%.]*<(\w+)>[^|$%.]*\|(\d+)\|[^|$%.\d]*(\d+(?:\.\d+)?)\$/';
    if (preg_match($pattern, $input, $matches)) {
        $customer = $matches[1];
        $product = $matches[2];
        $count = $matches[3];
        $price = $matches[4];
        $totalPrice = $count * $price;
        $income += $totalPrice;
        echo "{$customer}: {$product} - " . number_format($totalPrice, 2, '.', '') . PHP_EOL;
    }
}

echo "Total income: " . number_format($income, 2, '.', '') . PHP_EOL;
?>