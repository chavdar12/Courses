<?php

if (isset($_COOKIE['background-color'])) {
    $background = htmlspecialchars($_COOKIE['background-color'], ENT_QUOTES);
    echo "<body bgcolor='$background'>";
}
echo "<h1>Third Page</h1>";
