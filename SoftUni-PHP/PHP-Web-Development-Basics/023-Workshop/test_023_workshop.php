<?php

// Starts PHP's built-in server in this folder and uses the app like a browser would.
// Usage: php test_023_workshop.php

const ROUTER = 'index.php';
// --- test harness: a real PHP server for this folder, with a fresh database and sessions ---
$tmp = sys_get_temp_dir() . '/' . basename(__DIR__) . '-' . bin2hex(random_bytes(4));
mkdir($tmp);
$probe = stream_socket_server('tcp://127.0.0.1:0');
$port = (int) substr(strrchr(stream_socket_get_name($probe, false), ':'), 1);
fclose($probe);

$command = [PHP_BINARY, '-S', "127.0.0.1:$port", '-d', 'display_errors=1', '-d', 'html_errors=0',
    '-d', 'error_reporting=E_ALL', '-d', "session.save_path=$tmp"];
if (defined('ROUTER')) {
    $command[] = ROUTER;
}
$server = proc_open(
    $command,
    [['pipe', 'r'], ['file', "$tmp/server.log", 'w'], ['file', "$tmp/server.log", 'a']],
    $pipes,
    __DIR__,
    ['DB_FILE' => "$tmp/database.sqlite"] + getenv(),
);
register_shutdown_function(function () use ($server, $tmp) {
    proc_terminate($server);
    proc_close($server);
    array_map('unlink', glob("$tmp/*"));
    rmdir($tmp);
});
for ($i = 0; $i < 50 && !@fsockopen('127.0.0.1', $port); $i++) {
    usleep(100000);
}

$failed = 0;
function check(string $name, bool $ok): void
{
    global $failed;
    echo ($ok ? 'ok   ' : 'FAIL ') . $name . PHP_EOL;
    $failed += $ok ? 0 : 1;
}

$cookies = [];
// one browser request: returns [status, Location header, body]; a string $form is sent as JSON
function http(string $method, string $path, array|string $form = []): array
{
    global $port, $cookies;
    $headers = ['Cookie: ' . implode('; ', array_map(fn($k, $v) => "$k=$v", array_keys($cookies), $cookies))];
    $options = ['method' => $method, 'ignore_errors' => true, 'follow_location' => 0];
    if ($method !== 'GET') {
        $headers[] = 'Content-Type: ' . (is_string($form) ? 'application/json' : 'application/x-www-form-urlencoded');
        $options['content'] = is_string($form) ? $form : http_build_query($form);
    }
    $options['header'] = implode("\r\n", $headers);
    $body = file_get_contents("http://127.0.0.1:$port$path", false, stream_context_create(['http' => $options]));

    [$status, $location] = [0, null];
    foreach (http_get_last_response_headers() ?? [] as $line) {
        if (preg_match('~^HTTP/\S+ (\d+)~', $line, $m)) {
            $status = (int) $m[1];
        } elseif (preg_match('~^Location:\s*(.+)$~i', $line, $m)) {
            $location = trim($m[1]);
        } elseif (preg_match('~^Set-Cookie:\s*([^=]+)=([^;]*)~i', $line, $m)) {
            $cookies[$m[1]] = $m[2];
        }
    }
    if (preg_match('~(Fatal error|Parse error|Warning|Notice|Deprecated): .*~', $body, $m)) {
        check("$method $path runs without PHP errors ($m[0])", false);
    }
    return [$status, $location, $body];
}
// --- end of harness ---

[$status, , $page] = http('GET', '/');
check('the home page is the login form', $status === 200 && str_contains($page, 'action="loginProcess"'));
[, $location] = http('GET', '/users/profile');
check('the profile needs a login', $location === 'login');

$form = ['username' => 'peter', 'password' => '123', 'confirmPassword' => '123'];
[, , $page] = http('POST', '/users/registerProcess', ['confirmPassword' => 'x'] + $form);
check('register: passwords must match', str_contains($page, 'Password mismatch'));
[, , $page] = http('POST', '/users/registerProcess', ['username' => 'pete'] + $form);
check('register: short usernames are rejected', str_contains($page, 'User length too short'));
[$status, $location] = http('POST', '/users/registerProcess', $form);
check('register: success redirects to login', $status === 302 && $location === 'login');
[, , $page] = http('POST', '/users/registerProcess', $form);
check('register: a taken username is rejected', str_contains($page, 'This username is taken'));

[, , $page] = http('POST', '/users/loginProcess', ['username' => 'peter', 'password' => 'wrong']);
check('login: a wrong password is rejected', str_contains($page, 'Invalid username or password'));
[$status, $location] = http('POST', '/users/loginProcess', ['username' => 'peter', 'password' => '123']);
[, , $page] = http('GET', '/users/profile');
check('login: opens the profile', $status === 302 && $location === 'profile' && str_contains($page, 'Welcome, peter'));

$pages = [
    ['GET', '/profile/7/edit', 'edit profile 7 page opened'],
    ['POST', '/profile/7/edit', 'form for 7 profile edit submitted'],
    ['GET', '/questions/ask', 'you are asking a question'],
    ['GET', '/answers/get/3', 'Displaying 3 answer'],
];
foreach ($pages as [$method, $path, $text]) {
    [$status, , $page] = http($method, $path);
    check("$method $path reaches its controller", $status === 200 && str_contains($page, $text));
}
foreach (['/nope/x', '/users/__construct', '/profile/abc/edit'] as $path) {
    [$status] = http('GET', $path);
    check("GET $path is a 404", $status === 404);
}

echo PHP_EOL . "$failed failed" . PHP_EOL;
exit($failed === 0 ? 0 : 1);
