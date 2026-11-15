<?php
$input = trim(fgets(STDIN));
// user starts and ends with a letter/digit; host is dot-separated words, so a trailing '.' is left out
$pattern = '/(?<=^|\s)[a-zA-Z0-9](?:[\w.-]*[a-zA-Z0-9])?@[a-zA-Z-]+(?:\.[a-zA-Z-]+)+/';
preg_match_all($pattern, $input, $matches);
foreach ($matches[0] as $email) {
    echo $email . PHP_EOL;
}
?>