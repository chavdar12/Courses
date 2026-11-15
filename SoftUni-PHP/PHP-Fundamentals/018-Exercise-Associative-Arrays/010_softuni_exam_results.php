<?php

$results = [];
$submissions = [];

while (true) {
    $input = trim(fgets(STDIN));
    if ($input === "exam finished") break;

    if (strpos($input, "-banned") !== false) {
        list($username) = explode("-", $input);
        unset($results[$username]);
    } else {
        list($username, $language, $points) = explode("-", $input);
        $points = intval($points);

        if (!isset($results[$username])) {
            $results[$username] = [];
        }

        if (!isset($results[$username][$language]) || $results[$username][$language] < $points) {
            $results[$username][$language] = $points;
        }

        if (!isset($submissions[$language])) {
            $submissions[$language] = 0;
        }
        $submissions[$language]++;
    }
}

// a user's score is their best submission; highest first, ties by name
$scores = array_map('max', $results);
uksort($scores, fn($a, $b) => [$scores[$b], $a] <=> [$scores[$a], $b]);
echo "Results:\n";
foreach ($scores as $username => $maxPoints) {
    echo "$username | $maxPoints\n";
}

uksort($submissions, fn($a, $b) => [$submissions[$b], $a] <=> [$submissions[$a], $b]);
echo "Submissions:\n";
foreach ($submissions as $language => $count) {
    echo "$language - $count\n";
}
