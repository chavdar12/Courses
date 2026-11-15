<?php
$array1 = explode(" ", readline());
$array2 = explode(" ", readline());
$common = array_intersect($array2, $array1);
echo implode(" ", $common);
