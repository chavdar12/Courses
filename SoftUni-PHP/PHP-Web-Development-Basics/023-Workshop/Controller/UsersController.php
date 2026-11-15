<?php

namespace Controller;

use DTO\RequestModels\UserRegisterBindingModel;
use Exception\User\RegistrationException;
use DTO\ViewModels\UserProfileViewModel;
use Services\Users\UserServiceInterface;
use ViewEngine\ViewInterface;

class UsersController
{
    /** @var ViewInterface */
    private $view;

    public function __construct(ViewInterface $view)
    {
        $this->view = $view;
    }

    public function login()
    {
        return $this->view->render();
    }

    public function loginProcess(UserServiceInterface $userService, UserRegisterBindingModel $model)
    {
        if ($userService->verifyCredentials($model->getUsername(), $model->getPassword())) {
            $_SESSION['id'] = $userService->findByUsername($model->getUsername())->getId();
            session_regenerate_id(true);
            header("Location: profile");
            exit;
        }

        $this->view->render('Invalid username or password', 'users/login');
    }

    public function registerProcess(UserRegisterBindingModel $bindingModel, UserServiceInterface $userService)
    {
        try {
            $userService->register($bindingModel);
        } catch (RegistrationException $e) {
            $this->view->render($e->getMessage(), 'users/register');
            return;
        }
        header("Location: login");
        exit;
    }

    public function register()
    {
        $this->view->render();
    }

    public function profile(UserServiceInterface $userService)
    {
        if (!isset($_SESSION['id'])) {
            header("Location: login");
            exit;
        }

        $user = $userService->findOne($_SESSION['id']);
        $profileViewModel = new UserProfileViewModel($user->getUsername());
        $this->view->render($profileViewModel);
    }
}
