<?php

// Starts PHP's built-in server in this folder and uses the app like a browser would.
// Usage: php test_018_workshop_creating_an_ormview_engine.php

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

$peter = ['username' => 'peter', 'password' => '123', 'confirm_password' => '123',
    'first_name' => 'Peter', 'last_name' => '<Petrov>', 'born_on' => '2000-01-01'];

[, , $page] = http('GET', '/');
check('the home page links to login and register', str_contains($page, 'href="login.php"') && str_contains($page, 'href="register.php"'));
[, $location] = http('GET', '/profile.php');
check('the profile needs a login', $location === 'login.php');
[, $location] = http('GET', '/all.php');
check('the user list needs a login', $location === 'login.php');

[, , $page] = http('POST', '/register.php', ['register' => 1, 'confirm_password' => 'x'] + $peter);
check('register: passwords must match', str_contains($page, 'Password mismatch.') && str_contains($page, 'value="peter"'));
[$status, $location] = http('POST', '/register.php', ['register' => 1] + $peter);
check('register: success redirects to login', $status === 302 && $location === 'login.php');
[, , $page] = http('POST', '/register.php', ['register' => 1] + $peter);
check('register: a taken username is rejected', str_contains($page, 'Username already exist.'));
http('POST', '/register.php', ['register' => 1, 'username' => 'ana'] + $peter);

[, , $page] = http('POST', '/login.php', ['login' => 1, 'username' => 'peter', 'password' => 'wrong']);
check('login: a wrong password is rejected', str_contains($page, 'Username does not exist or password mismatch.'));
[, $location] = http('POST', '/login.php', ['login' => 1, 'username' => 'peter', 'password' => '123']);
[, , $page] = http('GET', '/profile.php');
check('login: opens the profile with the saved data (escaped)', $location === 'profile.php'
    && str_contains($page, 'value="peter"') && str_contains($page, 'value="&lt;Petrov&gt;"'));
[, , $page] = http('GET', '/all.php');
check('all users are listed', str_contains($page, '<td>Peter &lt;Petrov&gt;</td>') && str_contains($page, '<td>ana</td>'));

$edit = ['edit' => 1, 'username' => 'peter', 'password' => '', 'confirm_password' => '',
    'first_name' => 'Pete', 'last_name' => 'P', 'born_on' => '2001-02-03'];
[, , $page] = http('POST', '/profile.php', ['password' => 'a', 'confirm_password' => 'b'] + $edit);
check('edit: passwords must match', str_contains($page, 'Password mismatch.'));
[, , $page] = http('POST', '/profile.php', ['username' => 'ana'] + $edit);
check('edit: a taken username is rejected', str_contains($page, 'Username already exist.'));
[$status, $location] = http('POST', '/profile.php', $edit);
[, , $page] = http('GET', '/profile.php');
check('edit: saves the new data', $status === 302 && $location === 'profile.php' && str_contains($page, 'value="Pete"') && str_contains($page, 'value="2001-02-03"'));

http('GET', '/logout.php');
[, $location] = http('POST', '/login.php', ['login' => 1, 'username' => 'peter', 'password' => '123']);
check('edit: an empty password field keeps the old password', $location === 'profile.php');

echo PHP_EOL . "$failed failed" . PHP_EOL;
exit($failed === 0 ? 0 : 1);
