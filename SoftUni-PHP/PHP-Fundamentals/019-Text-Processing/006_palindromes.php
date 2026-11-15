<?php

$text = trim(fgets(STDIN));
$words = preg_split('/[\s,?.!:]+/', $text, -1, PREG_SPLIT_NO_EMPTY);
$palindromes = [];

foreach ($words as $word) {
    if ($word === strrev($word) && !in_array($word, $palindromes)) {
        $palindromes[] = $word;
    }
}

usort($palindromes, 'strcasecmp');
echo implode(', ', $palindromes);
