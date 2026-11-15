<?php
require_once 'common.php';

$error = null;
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $user = $userService->login($_POST['username'] ?? '', $_POST['password'] ?? '');
    if ($user !== null) {
        session_regenerate_id(true);
        $_SESSION['id'] = $user->getId();
        header("Location: profile.php");
        exit;
    }
    $error = 'Invalid username or password.';
}

$template->render('login', $error);
