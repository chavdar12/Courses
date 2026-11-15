<?php

$date = trim(fgets(STDIN));
$dateObj = DateTime::createFromFormat('d-m-Y', $date);
echo $dateObj->format('l') . PHP_EOL;
