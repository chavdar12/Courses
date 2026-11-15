<?php
// REST API for users:
//   GET  api.php/users        all users
//   GET  api.php/users/{id}   one user
//   POST api.php/users        create a user from JSON {"username": "...", "password": "..."}
// Run: php -S localhost:8000   then open http://localhost:8000
header('Content-Type: application/json');

// SQLite file next to the app (DB_FILE overrides it, e.g. in tests); tables are created on first use
$db = new PDO('sqlite:' . (getenv('DB_FILE') ?: __DIR__ . '/database.sqlite'));
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$db->exec(file_get_contents(__DIR__ . '/schema.sql'));

function respond(int $status, array $body): never
{
    http_response_code($status);
    echo json_encode($body);
    exit;
}

$path = trim($_SERVER['PATH_INFO'] ?? '', '/');
$method = $_SERVER['REQUEST_METHOD'];

if ($path === 'users' && $method === 'GET') {
    respond(200, $db->query("SELECT id, username FROM users ORDER BY id")->fetchAll(PDO::FETCH_ASSOC));
}

if (preg_match('~^users/(\d+)$~', $path, $m) && $method === 'GET') {
    $statement = $db->prepare("SELECT id, username FROM users WHERE id = ?");
    $statement->execute([$m[1]]);
    $user = $statement->fetch(PDO::FETCH_ASSOC);
    $user ? respond(200, $user) : respond(404, ['error' => 'User not found']);
}

if ($path === 'users' && $method === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $username = trim($data['username'] ?? '');
    $password = $data['password'] ?? '';
    if ($username === '' || $password === '') {
        respond(400, ['error' => 'Username and password are required']);
    }

    try {
        $db->prepare("INSERT INTO users (username, password) VALUES (?, ?)")
            ->execute([$username, password_hash($password, PASSWORD_ARGON2I)]);
    } catch (PDOException $e) {
        respond(409, ['error' => 'This username is taken']);
    }
    respond(201, ['id' => (int)$db->lastInsertId(), 'username' => $username]);
}

respond(404, ['error' => 'Not found']);
