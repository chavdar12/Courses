<?php
session_start();
spl_autoload_register(function (string $class) {
    require_once __DIR__ . '/' . str_replace('\\', '/', $class) . '.php';
});

// SQLite file next to the app (DB_FILE overrides it, e.g. in tests); tables are created on first use
$pdo = new PDO('sqlite:' . (getenv('DB_FILE') ?: __DIR__ . '/database.sqlite'));
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$pdo->exec(file_get_contents(__DIR__ . '/schema.sql'));

$template = new \Core\Template();
$userService = new \App\Services\UserService(
    new \App\Repository\UserRepository(new \Database\PDODatabase($pdo))
);
