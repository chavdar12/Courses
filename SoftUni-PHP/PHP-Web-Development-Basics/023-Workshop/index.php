<?php
// Front controller: /{controller}/{action}/{params...} runs {Controller}Controller::{action}(params...).
// Run: php -S localhost:8000 index.php   then open http://localhost:8000/users/register
session_start();
spl_autoload_register(function (string $class) {
    $file = __DIR__ . '/' . str_replace('\\', '/', $class) . '.php';
    if (is_file($file)) {
        require_once $file;
    }
});

$uri = trim(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH), '/');
$segments = $uri === '' ? ['users', 'login'] : explode('/', $uri);
$mvcContext = new \Core\MvcContext(array_shift($segments), array_shift($segments) ?? 'index', $segments);

$router = new \Routing\Router();
require 'routes.php';

// SQLite file next to the app (DB_FILE overrides it, e.g. in tests); tables are created on first use
$pdo = new PDO('sqlite:' . (getenv('DB_FILE') ?: __DIR__ . '/database.sqlite'));
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$pdo->exec(file_get_contents(__DIR__ . '/schema.sql'));

$app = new \Core\Application($mvcContext, $uri, $_SERVER, $router);
$app->addbean(\Database\DatabaseInterface::class, new \Database\PDODatabase($pdo));
$app->registerDependency(\ViewEngine\ViewInterface::class, \ViewEngine\View::class);
$app->registerDependency(\Repository\Users\UserRepositoryInterface::class, \Repository\Users\UserRepository::class);
$app->registerDependency(\Services\Users\UserServiceInterface::class, \Services\Users\UserService::class);
$app->registerDependency(\Services\Encryption\EncryptionServiceInterface::class, \Services\Encryption\ArgonEncryptionService::class);
$app->start();
