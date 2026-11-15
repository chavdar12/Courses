<?php
// Starts PHP's built-in server in this folder and uses the app like a browser would.
// Usage: php test_017_exercise_session_handling_and_authentication.php

// --- test harness: a real PHP server for this folder, with a fresh database and sessions ---
$tmp = sys_get_temp_dir() . '/' . basename(__DIR__) . '-' . bin2hex(random_bytes(4));
mkdir($tmp);
$probe = stream_socket_server('tcp://127.0.0.1:0');
$port = (int)substr(strrchr(stream_socket_get_name($probe, false), ':'), 1);
fclose($probe);

$command = [PHP_BINARY, '-S', "127.0.0.1:$port", '-d', 'display_errors=1', '-d', 'html_errors=0',
    '-d', 'error_reporting=E_ALL', '-d', "session.save_path=$tmp"];
if (defined('ROUTER')) {
    $command[] = ROUTER;
}
$server = proc_open($command, [['pipe', 'r'], ['file', "$tmp/server.log", 'w'], ['file', "$tmp/server.log", 'a']],
    $pipes, __DIR__, ['DB_FILE' => "$tmp/database.sqlite"] + getenv());
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
            $status = (int)$m[1];
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

[, $location] = http('GET', '/profile.php');
check('the profile needs a login', $location === 'login.php');
[, , $page] = http('POST', '/register.php', ['username' => 'peter', 'password' => '1', 'confirm_password' => '2']);
check('passwords must match', str_contains($page, 'Password mismatch.'));
[$status, $location] = http('POST', '/register.php', ['username' => 'peter', 'password' => '123', 'confirm_password' => '123']);
check('registering redirects to login', $status === 302 && $location === 'login.php');
[, , $page] = http('POST', '/register.php', ['username' => 'peter', 'password' => '1', 'confirm_password' => '1']);
check('a taken username is rejected', str_contains($page, 'This username is taken.'));
[, , $page] = http('POST', '/login.php', ['username' => 'peter', 'password' => 'wrong']);
check('a wrong password is rejected', str_contains($page, 'Invalid username or password.'));
[, $location] = http('POST', '/login.php', ['username' => 'peter', 'password' => '123']);
[, , $page] = http('GET', '/profile.php');
check('logging in opens the profile', $location === 'profile.php' && str_contains($page, 'Welcome, peter!'));
http('GET', '/logout.php');
[, $location] = http('GET', '/profile.php');
check('logging out closes the profile', $location === 'login.php');

echo PHP_EOL . "$failed failed" . PHP_EOL;
exit($failed === 0 ? 0 : 1);
