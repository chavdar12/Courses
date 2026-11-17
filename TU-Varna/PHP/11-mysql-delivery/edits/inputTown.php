<?php include '../includes/header.php'; ?>
<h2>Add Town</h2>
<form method="post">
    <label for="town">Town:</label>
    <input type="text" id="town" name="town" required>
    <input type="submit" name="submit" value="Submit">
</form>
<?php
include '../db/config.php';

if (isset($_POST['submit'])) {
    $town = trim($_POST['town']);
    if ($town !== '') {
        $stmt = $conn->prepare('INSERT INTO towns (townname) VALUES (?)');
        $stmt->bind_param('s', $town);
        if ($stmt->execute()) {
            echo "<p style='text-align:center; color:green;'>Town added successfully!</p>";
        } else {
            echo "<p style='text-align:center; color:red;'>Error: " . htmlspecialchars($conn->error) . '</p>';
        }
    } else {
        echo "<p style='text-align:center; color:red;'>Please fill in the field.</p>";
    }
}

$result = $conn->query('SELECT * FROM towns');
if ($result->num_rows > 0) {
    echo '<table><thead><tr><th>ID</th><th>Town</th></tr></thead>';
    while ($row = $result->fetch_assoc()) {
        echo '<tr><td>' . $row['townid'] . '</td><td>' . htmlspecialchars($row['townname']) . '</td></tr>';
    }
    echo '</table>';
}
?>
<?php include '../includes/footer.php'; ?>
