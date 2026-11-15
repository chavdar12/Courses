<?php

require_once 'common.php';

$error = null;
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $user = new \App\Data\UserDTO();
    $user->setUsername(trim($_POST['username'] ?? ''));
    $user->setPassword($_POST['password'] ?? '');

    $error = $userService->register($user, $_POST['confirm_password'] ?? '');
    if ($error === null) {
        header("Location: login.php");
        exit;
    }
}

$template->render('register', $error);
