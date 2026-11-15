<?php

// SQLite file next to the app (DB_FILE overrides it, e.g. in tests); tables are created on first use
$db = new PDO('sqlite:' . (getenv('DB_FILE') ?: __DIR__ . '/database.sqlite'));
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$db->exec(file_get_contents(__DIR__ . '/schema.sql'));

function e(?string $text): string
{
    return htmlspecialchars($text ?? '', ENT_QUOTES);
}
