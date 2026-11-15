<?php

// Starts PHP's built-in server in this folder and uses the app like a browser would.
// Usage: php test_016_session_handling_and_authentication.php

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

// 001_cookies
[$status, $location] = http('POST', '/001_cookies/index.php', ['color' => "pink'><script>"]);
check('cookies: picking a color redirects', $status === 302 && $location === 'another.php');
[, , $page] = http('GET', '/001_cookies/third.php');
check('cookies: the color is remembered and escaped', str_contains($page, "bgcolor='pink&#039;&gt;&lt;script&gt;'"));

// 002_sessions
[, , $page] = http('GET', '/002_sessions/another.php');
check('sessions: pages ask for a login first', str_contains($page, 'log in</a> first'));
http('POST', '/002_sessions/index.php', ['username' => '<Ana>']);
[, , $page] = http('GET', '/002_sessions/third.php');
check('sessions: the name is remembered and escaped', str_contains($page, 'Welcome, &lt;Ana&gt;') && str_contains($page, 'third page'));
[$status, $location] = http('GET', '/002_sessions/logout.php');
[, , $page] = http('GET', '/002_sessions/another.php');
check('sessions: logout forgets the user', $status === 302 && $location === 'index.php' && str_contains($page, 'log in</a> first'));

// 003_login_app
$app = '/003_login_app';
[, $location] = http('GET', "$app/profile.php");
check('login app: the profile needs a login', $location === 'login.php');
[, , $page] = http('POST', "$app/register.php", ['register' => 1, 'username' => 'pete', 'password' => '1', 'confirm' => '1']);
check('login app: short usernames are rejected', str_contains($page, 'User length too short'));
[, , $page] = http('POST', "$app/register.php", ['register' => 1, 'username' => 'peter', 'password' => '1', 'confirm' => '2']);
check('login app: passwords must match', str_contains($page, 'Password mismatch'));
[$status, $location] = http('POST', "$app/register.php", ['register' => 1, 'username' => 'peter', 'password' => '123', 'confirm' => '123']);
check('login app: registering redirects to login', $status === 302 && $location === 'login.php');
[, , $page] = http('POST', "$app/register.php", ['register' => 1, 'username' => 'peter', 'password' => '1', 'confirm' => '1']);
check('login app: a taken username is rejected', str_contains($page, 'This username is taken'));
[, , $page] = http('POST', "$app/login.php", ['login' => 1, 'username' => 'nobody', 'password' => '123']);
check('login app: unknown users cannot log in', str_contains($page, 'Invalid username or password'));

[$status, $location, $page] = http('POST', "$app/login.php", ['login' => 1, 'username' => 'peter', 'password' => '123']);
check('login app: logging in redirects to the profile', $status === 302 && $location === 'profile.php' && !str_contains($page, 'Login form'));
[, , $page] = http('GET', "$app/profile.php");
check('login app: the profile greets the user', str_contains($page, 'Welcome, peter') && str_contains($page, 'no profile picture'));

[, , $page] = http('POST', "$app/edit_profile.php", ['edit' => 1, 'username' => 'peter', 'old' => 'wrong', 'new' => '456']);
check('login app: changing the password needs the old one', str_contains($page, 'Password mismatch'));
[$status, $location] = http('POST', "$app/edit_profile.php", ['edit' => 1, 'username' => 'peter2', 'old' => '123', 'new' => '456']);
check('login app: editing without a picture works', $status === 302 && $location === 'profile.php');
$cookies = [];
[, $location] = http('POST', "$app/login.php", ['login' => 1, 'username' => 'peter2', 'password' => '456']);
check('login app: the new username and password work', $location === 'profile.php');

echo PHP_EOL . "$failed failed" . PHP_EOL;
exit($failed === 0 ? 0 : 1);
