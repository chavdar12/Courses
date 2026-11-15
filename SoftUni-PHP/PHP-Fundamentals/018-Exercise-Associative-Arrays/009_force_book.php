<?php

$forceUsers = [];
while (($input = trim(fgets(STDIN))) !== "Lumpawaroo") {
    if (strpos($input, " | ") !== false) {
        // "side | user" only adds users that are not on any side yet
        list($forceSide, $forceUser) = explode(" | ", $input);
        if (!isset($forceUsers[$forceUser])) {
            $forceUsers[$forceUser] = $forceSide;
        }
    } else {
        // "user -> side" adds or moves the user
        list($forceUser, $forceSide) = explode(" -> ", $input);
        $forceUsers[$forceUser] = $forceSide;
        echo "$forceUser joins the $forceSide side!\n";
    }
}

$forceSides = [];
foreach ($forceUsers as $user => $side) {
    $forceSides[$side][] = $user;
}

// most members first, ties by side name
uksort($forceSides, fn($a, $b) => [count($forceSides[$b]), $a] <=> [count($forceSides[$a]), $b]);
foreach ($forceSides as $side => $users) {
    echo "Side: $side, Members: " . count($users) . "\n";
    sort($users);
    foreach ($users as $user) {
        echo "! $user\n";
    }
}
