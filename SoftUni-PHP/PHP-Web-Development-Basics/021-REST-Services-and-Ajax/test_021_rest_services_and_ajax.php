<?php

// Starts PHP's built-in server in this folder and uses the app like a browser would.
// Usage: php test_021_rest_services_and_ajax.php

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

[$status, , $page] = http('GET', '/index.html');
check('the page talks to the local API', $status === 200 && str_contains($page, 'const apiUrl = "api.php/users";'));

[$status, , $body] = http('GET', '/api.php/users');
check('GET users starts empty', $status === 200 && $body === '[]');

[$status, , $body] = http('POST', '/api.php/users', json_encode(['username' => 'peter', 'password' => '123']));
check('POST users creates a user', $status === 201 && json_decode($body, true) === ['id' => 1, 'username' => 'peter']);
[$status, , $body] = http('POST', '/api.php/users', json_encode(['username' => 'peter', 'password' => '1']));
check('POST users rejects a taken username', $status === 409 && json_decode($body, true) === ['error' => 'This username is taken']);
[$status] = http('POST', '/api.php/users', json_encode(['username' => '', 'password' => '1']));
check('POST users needs a username and password', $status === 400);
http('POST', '/api.php/users', json_encode(['username' => 'ana', 'password' => '123']));

[$status, , $body] = http('GET', '/api.php/users');
check('GET users lists users without passwords', $status === 200 && json_decode($body, true) === [['id' => 1, 'username' => 'peter'], ['id' => 2, 'username' => 'ana']]);
[$status, , $body] = http('GET', '/api.php/users/2');
check('GET users/{id} returns one user', $status === 200 && json_decode($body, true) === ['id' => 2, 'username' => 'ana']);
[$status] = http('GET', '/api.php/users/99');
check('GET an unknown user is a 404', $status === 404);
[$status] = http('DELETE', '/api.php/users/1');
check('unsupported requests are a 404', $status === 404);

echo PHP_EOL . "$failed failed" . PHP_EOL;
exit($failed === 0 ? 0 : 1);
