<?php
// Front controller: every request goes through the router.
// Run: php -S localhost:8000 index.php   then open http://localhost:8000/users/login
spl_autoload_register(function (string $class) {
    require_once __DIR__ . '/' . str_replace('\\', '/', $class) . '.php';
});

$router = new \Routing\Router();
require 'routes.php';

$uri = trim(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH), '/');
if (!$router->invoke($uri, $_SERVER['REQUEST_METHOD'])) {
    http_response_code(404);
    echo "<h1>404 Not Found</h1>";
}
