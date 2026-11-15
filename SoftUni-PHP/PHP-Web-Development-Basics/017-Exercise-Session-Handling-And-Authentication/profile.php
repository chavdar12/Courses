<?php

require_once 'common.php';

$user = isset($_SESSION['id']) ? $userService->findById($_SESSION['id']) : null;
if ($user === null) {
    header("Location: login.php");
    exit;
}

$template->render('profile', $user);
