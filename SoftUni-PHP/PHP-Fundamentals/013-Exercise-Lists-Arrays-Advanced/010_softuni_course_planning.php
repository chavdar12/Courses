<?php

$courses = explode(", ", trim(fgets(STDIN)));

while (true) {
    $command = trim(fgets(STDIN));
    if ($command == "course start") {
        break;
    }

    $parts = explode(":", $command);
    $action = $parts[0];

    if ($action == "Add") {
        $lesson = $parts[1];
        if (!in_array($lesson, $courses)) {
            $courses[] = $lesson;
        }
    } elseif ($action == "Insert") {
        $lesson = $parts[1];
        $index = (int) $parts[2];
        if (!in_array($lesson, $courses)) {
            array_splice($courses, $index, 0, $lesson);
        }
    } elseif ($action == "Remove") {
        $lesson = $parts[1];
        foreach ([$lesson, $lesson . "-Exercise"] as $item) {
            if (($key = array_search($item, $courses)) !== false) {
                array_splice($courses, $key, 1);
            }
        }
    } elseif ($action == "Swap") {
        $lesson1 = $parts[1];
        $lesson2 = $parts[2];
        if (in_array($lesson1, $courses) && in_array($lesson2, $courses)) {
            $index1 = array_search($lesson1, $courses);
            $index2 = array_search($lesson2, $courses);
            $courses[$index1] = $lesson2;
            $courses[$index2] = $lesson1;

            // an exercise always follows its lesson
            foreach ([$lesson1, $lesson2] as $lesson) {
                $exercise = array_search($lesson . "-Exercise", $courses);
                if ($exercise !== false) {
                    array_splice($courses, $exercise, 1);
                    array_splice($courses, array_search($lesson, $courses) + 1, 0, $lesson . "-Exercise");
                }
            }
        }
    } elseif ($action == "Exercise") {
        $lesson = $parts[1];
        if (in_array($lesson, $courses)) {
            $lessonEx = $lesson . "-Exercise";
            if (!in_array($lessonEx, $courses)) {
                $index = array_search($lesson, $courses);
                array_splice($courses, $index + 1, 0, $lessonEx);
            }
        } else {
            $courses[] = $lesson;
            $courses[] = $lesson . "-Exercise";
        }
    }
}

foreach ($courses as $index => $lesson) {
    echo ($index + 1) . "." . $lesson . "\n";
}
