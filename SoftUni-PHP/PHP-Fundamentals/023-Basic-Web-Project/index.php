<?php
// Phonebook: list contacts and add new ones. Contacts live in the visitor's session.
// Run: php -S localhost:8000   then open http://localhost:8000
session_start();
$_SESSION['contacts'] ??= [];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = trim($_POST['contact']['name'] ?? '');
    $number = trim($_POST['contact']['number'] ?? '');
    if ($name !== '' && $number !== '') {
        $_SESSION['contacts'][] = ['name' => $name, 'number' => $number];
    }
    // post/redirect/get, so refreshing the page does not add the contact twice
    header('Location: /', true, 303);
    exit;
}

$e = fn(string $text) => htmlspecialchars($text, ENT_QUOTES);
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8"/>
    <title>Phonebook</title>
    <link rel="stylesheet" href="css/bootstrap.css"/>
</head>
<body>
<nav class="navbar navbar-default">
    <div class="container-fluid">
        <div class="navbar-header">
            <a class="navbar-brand" href="/">Phonebook</a>
        </div>
    </div>
</nav>

<div class="container">
    <legend>All Contacts</legend>
    <table class="table">
        <thead>
        <tr>
            <th scope="col">Name</th>
            <th scope="col">Number</th>
        </tr>
        </thead>
        <tbody>
        <?php foreach ($_SESSION['contacts'] as $contact): ?>
            <tr>
                <td><?= $e($contact['name']) ?></td>
                <td><?= $e($contact['number']) ?></td>
            </tr>
        <?php endforeach; ?>
        </tbody>
    </table>

    <form class="form-horizontal" action="/" method="POST">
        <fieldset>
            <legend>New Contact</legend>
            <div class="form-group">
                <label for="name" class="col-lg-2 control-label">Name</label>
                <div class="col-lg-10">
                    <input type="text" autofocus name="contact[name]" class="form-control" id="name" required/>
                </div>
            </div>
            <div class="form-group">
                <label for="number" class="col-lg-2 control-label">Number</label>
                <div class="col-lg-10">
                    <input type="text" name="contact[number]" class="form-control" id="number" required/>
                </div>
            </div>
            <div class="form-group">
                <div class="col-lg-10 col-lg-offset-2">
                    <button type="submit" class="btn btn-primary">Add</button>
                </div>
            </div>
        </fieldset>
    </form>

    <hr/>

    <footer>
        <p>&copy; Software University</p>
    </footer>
</div>
</body>
</html>
