<?php

// Starts PHP's built-in server in this folder and uses the app like a browser would.
// Usage: php test_009_workshop_database_driven_application.php

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

function login(string $username, string $password): string
{
    [, $location] = http('POST', '/login.php', ['username' => $username, 'password' => $password]);
    parse_str((string) parse_url((string) $location, PHP_URL_QUERY), $query);
    return $query['authId'] ?? '';
}

[$status, $location] = http('GET', '/categories.php');
check('pages need a login', $status === 302 && $location === 'login.php');

[$status, $location] = http('POST', '/register.php', ['username' => 'admin', 'password' => '123']);
check('registering redirects to login', $status === 302 && $location === 'login.php');
[, , $page] = http('POST', '/register.php', ['username' => 'admin', 'password' => '456']);
check('a taken username is rejected', str_contains($page, 'This username is taken'));
[, , $page] = http('POST', '/login.php', ['username' => 'nobody', 'password' => '123']);
check('an unknown user cannot log in', str_contains($page, 'Invalid username or password'));

$admin = login('admin', '123');
check('logging in issues an auth id', $admin !== '');
[, , $page] = http('GET', "/categories.php?authId=$admin");
check('categories are listed', str_contains($page, 'Programming') && str_contains($page, 'Education'));
check('the first user is an admin', str_contains($page, 'Create new category'));

http('POST', "/create_category.php?authId=$admin", ['name' => '<PHP>']);
[, , $page] = http('GET', "/categories.php?authId=$admin");
check('an admin can create a category (escaped)', str_contains($page, '&lt;PHP&gt;'));

[$status, $location] = http(
    'POST',
    "/ask_question.php?authId=$admin&category_id=1",
    ['title' => 'How to use PDO?', 'body' => 'Please help', 'category' => '1', 'new_tags' => 'php, sqlite,'],
);
check('asking a question opens it', $status === 302 && str_starts_with((string) $location, 'question.php?id=1&'));
[, , $page] = http('GET', "/ask_question.php?authId=$admin&category_id=1");
check('new tags are saved', str_contains($page, 'php (1)') && str_contains($page, 'sqlite (1)') && !str_contains($page, ' (1)</option>' . "\n" . '            <option value="3"'));

http('POST', "/question.php?id=1&authId=$admin", ['answer' => 'Answer!', 'body' => 'Use <b>prepare</b>']);
[, , $page] = http('GET', "/question.php?id=1&authId=$admin");
check('answers are shown escaped', str_contains($page, 'How to use PDO?') && str_contains($page, 'Use &lt;b&gt;prepare&lt;/b&gt;'));

http('GET', "/category.php?id=1&authId=$admin&action=like&question_id=1");
[, , $page] = http('GET', "/category.php?id=1&authId=$admin&action=like&question_id=1");
check('a question can be liked only once', str_contains($page, 'How to use PDO?') && preg_match('~Remove\s+like</a> \(1\)~', $page) === 1);
[, , $page] = http('GET', "/category.php?id=1&authId=$admin&action=removeLike&question_id=1");
check('a like can be removed', preg_match('~>Like</a> \(0\)~', $page) === 1);

http('POST', '/register.php', ['username' => 'pesho', 'password' => '123']);
$user = login('pesho', '123');
[, $location] = http('GET', "/create_category.php?authId=$user");
check('a normal user cannot create categories', str_starts_with((string) $location, 'logout.php'));

http('GET', "/logout.php?authId=$admin");
[$status, $location] = http('GET', "/categories.php?authId=$admin");
check('logging out invalidates the auth id', $status === 302 && $location === 'login.php');

echo PHP_EOL . "$failed failed" . PHP_EOL;
exit($failed === 0 ? 0 : 1);
