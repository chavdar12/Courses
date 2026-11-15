<?php
require_once 'secure_common.php';

$errors = [];

if (isset($_POST['edit'])) {
    $username = $_POST['username'];
    $oldPassword = $_POST['old'];
    $newPassword = $_POST['new'];

    if (($_FILES['profile_picture']['error'] ?? UPLOAD_ERR_NO_FILE) === UPLOAD_ERR_OK) {
        try {
            $userService->setProfilePicture(
                $id,
                $_FILES['profile_picture']['tmp_name'],
                $_FILES['profile_picture']['type'],
                $_FILES['profile_picture']['size']
            );
        } catch (\Exception\User\UploadException $e) {
            $errors[] = $e->getMessage();
        }
    }

    try {
        $userService->edit($id, new \Data\Users\UserEditDTO($id, $username, $oldPassword, $newPassword));
        header("Location: profile.php");
        exit;
    } catch (\Exception\User\EditProfileException $e) {
        $errors[] = $e->getMessage();
    } catch (PDOException $_) {
        $errors[] = 'This username is taken';
    }
}

require_once 'views/users/edit_profile.php';