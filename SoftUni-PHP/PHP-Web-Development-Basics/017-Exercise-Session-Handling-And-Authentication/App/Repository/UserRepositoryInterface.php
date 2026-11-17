<?php

namespace App\Repository;

use App\Data\UserDTO;

interface UserRepositoryInterface
{
    public function insert(UserDTO $userDTO): bool;

    public function findByUsername(string $username): ?UserDTO;

    public function findById(int $id): ?UserDTO;
}
