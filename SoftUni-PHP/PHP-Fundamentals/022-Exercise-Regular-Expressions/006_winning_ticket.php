<?php

$tickets = preg_split('/\s*,\s*/', trim(fgets(STDIN)), -1, PREG_SPLIT_NO_EMPTY);
foreach ($tickets as $ticket) {
    if (strlen($ticket) != 20) {
        echo "invalid ticket\n";
        continue;
    }
    $pattern = '/([@#$^])\1{5,9}/';
    preg_match($pattern, substr($ticket, 0, 10), $leftMatch);
    preg_match($pattern, substr($ticket, 10), $rightMatch);

    // both halves need a run of the same symbol; the shorter run counts
    if ($leftMatch && $rightMatch && $leftMatch[1] === $rightMatch[1]) {
        $symbol = $leftMatch[1];
        $length = min(strlen($leftMatch[0]), strlen($rightMatch[0]));
        echo "ticket \"{$ticket}\" - {$length}{$symbol}" . ($length == 10 ? " Jackpot!" : "") . "\n";
    } else {
        echo "ticket \"{$ticket}\" - no match\n";
    }
}
