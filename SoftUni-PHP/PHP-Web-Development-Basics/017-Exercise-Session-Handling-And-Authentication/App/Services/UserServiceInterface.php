<?php

namespace App\Services;

use App\Data\UserDTO;

interface UserServiceInterface
{
    public function register(UserDTO $userDTO, string $confirmPassword): ?string;

    public function login(string $username, string $password): ?UserDTO;

    public function findById(int $id): ?UserDTO;
}
