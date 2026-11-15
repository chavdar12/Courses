<?php
session_start();
spl_autoload_register(function ($className) {
    require_once __DIR__ . '/' . str_replace("\\", '/', $className) . '.php';
});
// SQLite file next to the app (DB_FILE overrides it, e.g. in tests); tables are created on first use
$pdo = new \PDO('sqlite:' . (getenv('DB_FILE') ?: __DIR__ . '/database.sqlite'));
$pdo->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);
$pdo->exec(file_get_contents(__DIR__ . '/schema.sql'));
$db = new \Database\PDODatabase($pdo);
