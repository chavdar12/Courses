<?php
class Person
{
    private string $username;
    private string $password;

    public function __construct(string $username, string $password)
    {
        $this->setUsername($username);
        $this->setPassword($password);
    }

    public function __toString(): string
    {
        return htmlspecialchars($this->getUsername()) . "<br />" . htmlspecialchars($this->getPassword());
    }

    public function getUsername(): string
    {
        return $this->username;
    }

    public function setUsername(string $username): void
    {
        $this->username = $username;
    }

    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): void
    {
        $this->password = $password;
    }
}

if (isset($_POST['register'])) {
    $username = $_POST['username'];
    $password = $_POST['password'];

    $person = new Person($username, $password);
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Register</title>
</head>
<body>
    <form method="post">
        <label for="username">Username: </label><input type="text" name="username" id="username"/><br>
        <label for="password">Password: </label><input type="password" name="password" id="password"/><br>
        <input type="submit" name="register" value="Register"><br>
    </form>

    <?php if (isset($person)): ?>
        <p><?= $person ?></p>
    <?php endif; ?>
</body>
</html>
