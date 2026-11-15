<?php
$text = trim(fgets(STDIN));
// every character moves 3 places forward in the ASCII table
echo implode('', array_map(fn($char) => chr(ord($char) + 3), str_split($text)));
