<?php
session_start();
if (!isset($_SESSION['logged_in_user'])) {
    echo "<h1>Please <a href='index.php'>log in</a> first</h1>";
} else {
    echo "<h1>Welcome, " . htmlspecialchars($_SESSION['logged_in_user']) . "</h1>";
    echo "<h3>This is the third page, so you are logged in!</h3>";
    echo "<br/>";
    echo "<a href='logout.php'>Logout</a>";
}