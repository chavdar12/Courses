<?php

namespace App\Services;

use App\Data\UserDTO;
use App\Repository\UserRepositoryInterface;

class UserService implements UserServiceInterface
{
    private $userRepository;

    public function __construct(UserRepositoryInterface $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    // returns an error message, or null when the user was registered
    public function register(UserDTO $userDTO, string $confirmPassword): ?string
    {
        if ($userDTO->getUsername() === '' || $userDTO->getPassword() === '') {
            return 'Username and password are required.';
        }

        if ($userDTO->getPassword() !== $confirmPassword) {
            return 'Password mismatch.';
        }

        if (null !== $this->userRepository->findByUsername($userDTO->getUsername())) {
            return 'This username is taken.';
        }

        $userDTO->setPassword(password_hash($userDTO->getPassword(), PASSWORD_ARGON2ID));
        $this->userRepository->insert($userDTO);

        return null;
    }

    public function login(string $username, string $password): ?UserDTO
    {
        $user = $this->userRepository->findByUsername($username);
        if ($user === null || !password_verify($password, $user->getPassword())) {
            return null;
        }

        return $user;
    }

    public function findById(int $id): ?UserDTO
    {
        return $this->userRepository->findById($id);
    }
}
