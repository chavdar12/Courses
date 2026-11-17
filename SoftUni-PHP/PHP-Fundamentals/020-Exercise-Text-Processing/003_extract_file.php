<?php

$path = trim(fgets(STDIN));
// split on Windows backslashes ourselves: pathinfo() only knows "/" outside Windows
$file = substr(strrchr('\\' . $path, '\\'), 1);
$dot = strrpos($file, '.');
echo "File name: " . substr($file, 0, $dot) . PHP_EOL;
echo "File extension: " . substr($file, $dot + 1) . PHP_EOL;
