<?php
// Drives index.php like a browser: adds contacts with POST, then reads the page with GET in the same session.
// Usage: php test_023_basic_web_project.php

$sessionDir = sys_get_temp_dir() . '/phonebook-test-' . bin2hex(random_bytes(4));
mkdir($sessionDir);
$sessionId = bin2hex(random_bytes(16));

function request(string $method, array $post = []): array
{
    global $sessionDir, $sessionId;
    $code = '$_SERVER["REQUEST_METHOD"] = $argv[1]; $_POST = json_decode($argv[2], true); '
        . '$_COOKIE[session_name()] = $argv[3]; require "index.php";';
    $command = [PHP_BINARY, '-d', 'display_errors=stderr', '-d', "session.save_path=$sessionDir",
        '-r', $code, '--', $method, json_encode($post), $sessionId];
    $process = proc_open($command, [['pipe', 'r'], ['pipe', 'w'], ['pipe', 'w']], $pipes, __DIR__);
    fclose($pipes[0]);
    $stdout = stream_get_contents($pipes[1]);
    $stderr = stream_get_contents($pipes[2]);
    proc_close($process);
    return [$stdout, $stderr];
}

$failed = 0;
function check(string $name, bool $ok): void
{
    global $failed;
    echo ($ok ? 'ok   ' : 'FAIL ') . $name . PHP_EOL;
    $failed += $ok ? 0 : 1;
}

[$page, $errors] = request('GET');
check('empty phonebook renders the form', str_contains($page, 'name="contact[name]"') && $errors === '');
check('empty phonebook lists no contacts', !str_contains($page, '<td>'));

[$page, $errors] = request('POST', ['contact' => ['name' => 'Peter', 'number' => '0888 123 456']]);
check('adding a contact redirects without output', $page === '' && $errors === '');
request('POST', ['contact' => ['name' => '<script>', 'number' => '1']]);
request('POST', ['contact' => ['name' => '   ', 'number' => '2']]);

[$page, $errors] = request('GET');
check('added contact is listed', str_contains($page, '<td>Peter</td>') && str_contains($page, '<td>0888 123 456</td>'));
check('contact names are HTML-escaped', str_contains($page, '<td>&lt;script&gt;</td>') && !str_contains($page, '<td><script>'));
check('blank names are ignored', substr_count($page, '<tr>') === 3);
check('stylesheet exists', file_exists(__DIR__ . '/css/bootstrap.css'));

array_map('unlink', glob("$sessionDir/*"));
rmdir($sessionDir);

echo PHP_EOL . "$failed failed" . PHP_EOL;
exit($failed === 0 ? 0 : 1);
