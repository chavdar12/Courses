<?php
$length = intval(fgets(STDIN));
$bestSeq = [];
$bestLength = 0;
$bestStart = PHP_INT_MAX;
$bestSum = 0;
$bestSample = 0;
$sample = 0;

while (($line = trim(fgets(STDIN))) !== 'Clone them!') {
    $sample++;
    $seq = array_map('intval', preg_split('/!+/', $line, -1, PREG_SPLIT_NO_EMPTY));

    // longest run of ones and the index where it starts
    $runLength = 0;
    $runStart = 0;
    $current = 0;
    for ($i = 0; $i < $length; $i++) {
        $current = $seq[$i] === 1 ? $current + 1 : 0;
        if ($current > $runLength) {
            $runLength = $current;
            $runStart = $i - $current + 1;
        }
    }
    $sum = array_sum($seq);

    if ($runLength > $bestLength
        || ($runLength === $bestLength && $runStart < $bestStart)
        || ($runLength === $bestLength && $runStart === $bestStart && $sum > $bestSum)) {
        $bestLength = $runLength;
        $bestStart = $runStart;
        $bestSum = $sum;
        $bestSample = $sample;
        $bestSeq = $seq;
    }
}

echo "Best DNA sample $bestSample with sum: $bestSum." . PHP_EOL;
echo implode(' ', $bestSeq) . PHP_EOL;
