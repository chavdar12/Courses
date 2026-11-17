<?php /** @var \App\Data\UserDTO $data */ ?>

<h2>Your Profile</h2>

<?php if ($error): ?>
    <span style="color: red"><?= htmlspecialchars($error->getMessage()) ?></span>
    <br/><br/>
<?php endif; ?>

<form method="post">
    <label>
        Username: <input type="text" name="username" value="<?= htmlspecialchars((string) ($data->getUsername())) ?>"/> <br/>
    </label>
    <label>
        Password: <input type="password" name="password" placeholder="leave empty to keep it"/> <br/>
    </label>
    <label>
        Confirm Password: <input type="password" name="confirm_password"/> <br/>
    </label>
    <label>
        First Name: <input type="text" name="first_name" value="<?= htmlspecialchars((string) ($data->getFirstName())) ?>"/><br/>
    </label>
    <label>
        Last Name: <input type="text" name="last_name" value="<?= htmlspecialchars((string) ($data->getLastName())) ?>"/><br/>
    </label>
    <label>
        Birthday: <input type="text" name="born_on" value="<?= htmlspecialchars((string) ($data->getBornOn())) ?>"/><br/>
    </label>
    <input type="submit" name="edit" value="Edit"/> <br/>

</form>

You can <a href="logout.php">logout</a> or see <a href="all.php">all users</a>.