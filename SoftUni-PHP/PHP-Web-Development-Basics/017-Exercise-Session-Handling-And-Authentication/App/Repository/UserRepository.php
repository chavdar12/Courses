<?php

namespace App\Repository;

use App\Data\UserDTO;
use Database\DatabaseInterface;

class UserRepository implements UserRepositoryInterface
{
    private $db;

    public function __construct(DatabaseInterface $database)
    {
        $this->db = $database;
    }

    public function insert(UserDTO $userDTO): bool
    {
        $this->db->query("INSERT INTO users(username, password) VALUES(?, ?)")
            ->execute([$userDTO->getUsername(), $userDTO->getPassword()]);

        return true;
    }

    public function findByUsername(string $username): ?UserDTO
    {
        return $this->db->query("SELECT id, username, password FROM users WHERE username = ?")
            ->execute([$username])
            ->fetch(UserDTO::class)
            ->current();
    }

    public function findById(int $id): ?UserDTO
    {
        return $this->db->query("SELECT id, username, password FROM users WHERE id = ?")
            ->execute([$id])
            ->fetch(UserDTO::class)
            ->current();
    }
}
