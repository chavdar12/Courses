<?php
require_once 'common.php';

$error = '';
if (isset($_POST['login'])) {
    $username = $_POST['username'];
    $password = $_POST['password'];


    $userService = new \Services\Users\UserService(
        new \Repositories\Users\UserRepository($db),
        new \Services\Encryption\ArgonEncryptionService()
    );

    if ($userService->verifyCredentials($username, $password)) {
        $user = $userService->findByUsername($username);
        $_SESSION['id'] = $user->getId();
        session_regenerate_id(true);
        header("Location: profile.php");
        exit;
    } else {
        $error = 'Invalid username or password';
    }
}

require_once 'views/users/login.php';