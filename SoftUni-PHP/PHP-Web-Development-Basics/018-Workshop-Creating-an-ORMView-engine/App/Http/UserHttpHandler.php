<?php

namespace App\Http;

use App\Data\ErrorDTO;
use App\Data\UserDTO;
use App\Service\UserServiceInterface;

class UserHttpHandler extends UserHttpHandlerAbstract
{
    public function index(UserServiceInterface $userService)
    {
        $this->render("home/index");
    }

    public function all(UserServiceInterface $userService)
    {
        if (!$userService->isLogged()) {
            $this->redirect("login.php");
        }

        $this->render("users/all", $userService->getAll());
    }

    public function profile(UserServiceInterface $userService, array $formData = [])
    {
        if (!$userService->isLogged()) {
            $this->redirect("login.php");
        }

        if (isset($formData['edit'])) {
            $this->handleEditProcess($userService, $formData);
        } else {
            $this->render("users/profile", $userService->currentUser());
        }
    }

    private function handleEditProcess(UserServiceInterface $userService, array $formData)
    {
        $user = $this->dataBinder->bind($formData, UserDTO::class);

        if ($user->getPassword() !== ($formData['confirm_password'] ?? '')) {
            $this->render("users/profile", $user, new ErrorDTO("Password mismatch."));
        } elseif ($userService->edit($user)) {
            $this->redirect("profile.php");
        } else {
            $this->render("users/profile", $user, new ErrorDTO("Username already exist."));
        }
    }

    public function login(UserServiceInterface $userService, array $formData = [])
    {
        if (isset($formData['login'])) {
            $this->handleLoginProcess($userService, $formData);
        } else {
            $this->render("users/login");
        }
    }

    private function handleLoginProcess(UserServiceInterface $userService, array $formData)
    {
        $user = $userService->login($formData['username'], $formData['password']);

        if (null !== $user) {
            session_regenerate_id(true);
            $_SESSION['id'] = $user->getId();
            $this->redirect("profile.php");
        }

        $this->render(
            "users/login",
            $this->dataBinder->bind($formData, UserDTO::class),
            new ErrorDTO("Username does not exist or password mismatch."),
        );
    }

    public function register(UserServiceInterface $userService, array $formData = [])
    {
        if (isset($formData['register'])) {
            $this->handleRegisterProcess($userService, $formData);
        } else {
            $this->render("users/register");
        }
    }

    private function handleRegisterProcess(UserServiceInterface $userService, array $formData)
    {
        $user = $this->dataBinder->bind($formData, UserDTO::class);

        if ($user->getPassword() !== ($formData['confirm_password'] ?? '')) {
            $this->render("users/register", $user, new ErrorDTO("Password mismatch."));
        } elseif ($userService->register($user, $formData['confirm_password'])) {
            $this->redirect("login.php");
        } else {
            $this->render("users/register", $user, new ErrorDTO("Username already exist."));
        }
    }
}
