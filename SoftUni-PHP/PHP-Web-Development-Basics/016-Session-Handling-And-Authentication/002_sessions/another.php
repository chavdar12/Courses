<?php
session_start();
session_regenerate_id(true);//regenerates the session on every request, so the old value is invalidated
if (!isset($_SESSION['logged_in_user'])) {
    echo "<h1>Please <a href='index.php'>log in</a> first</h1>";
} else {
    echo "<h1>Welcome, " . htmlspecialchars($_SESSION['logged_in_user']) . "</h1>";
    echo "<a href='third.php'> Third page</a>";
    echo "<br/>";
    echo "<a href='logout.php'>Logout</a>";
}