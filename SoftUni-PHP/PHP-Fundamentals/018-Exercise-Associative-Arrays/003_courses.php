<?php

$courses = [];

while (true) {
    $input = trim(fgets(STDIN));
    if ($input == "end") {
        break;
    }

    [$courseName, $studentName] = explode(' : ', $input);

    if (!isset($courses[$courseName])) {
        $courses[$courseName] = [];
    }

    $courses[$courseName][$studentName] = true;
}

// most students first; ties keep their input order
uasort($courses, fn($a, $b) => count($b) <=> count($a));
foreach ($courses as $courseName => $students) {
    echo "$courseName: " . count($students) . "\n";
    ksort($students);
    foreach ($students as $student => $_) {
        echo "-- $student\n";
    }
}
