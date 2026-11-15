<?php
// SQLite file next to the app (DB_FILE overrides it, e.g. in tests); tables are created on first use
$db = new PDO('sqlite:' . (getenv('DB_FILE') ?: dirname(__DIR__) . '/database.sqlite'));
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$db->exec(file_get_contents(dirname(__DIR__) . '/schema.sql'));

function e($text): string
{
    return htmlspecialchars((string)$text, ENT_QUOTES);
}
