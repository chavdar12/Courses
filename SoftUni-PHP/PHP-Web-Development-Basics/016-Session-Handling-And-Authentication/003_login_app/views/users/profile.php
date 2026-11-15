<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Profile</title>
</head>
<body>
<h1>Profile</h1>
<h2 style="color:green">
    Welcome, <?= htmlspecialchars($user->getUsername()); ?>
</h2>

<?php if ($user->getProfilePictureUrl() === null): ?>
    <h2>You have no profile picture</h2>
<?php else: ?>
    <img width="10%" height="15%"
         src="<?= htmlspecialchars($user->getProfilePictureUrl()); ?>" alt="Profile picture"/>
    <br/>
<?php endif; ?>

<a href="edit_profile.php">Edit your profile</a>
</body>
</html>