<?php include '../includes/header.php'; ?>
<h2>Delete Provider</h2>

<?php
include '../db/config.php';

if (isset($_POST['delete'])) {
    $id = (int) $_POST['id'];
    $stmt = $conn->prepare('DELETE FROM companyinfo WHERE id = ?');
    $stmt->bind_param('i', $id);
    if ($stmt->execute()) {
        echo "<p style='text-align:center; color:green;'>Provider deleted successfully!</p>";
    } else {
        echo "<p style='text-align:center; color:red;'>Error: " . htmlspecialchars($conn->error) . '</p>';
    }
}

// Load the list after deleting, so the removed provider is not shown
$result = $conn->query('SELECT id, companyname FROM companyinfo');
?>

<form method="post">
    <label for="id">Select Provider to Delete:</label>
    <select id="id" name="id" required>
        <?php while ($row = $result->fetch_assoc()): ?>
            <option value="<?= $row['id'] ?>"><?= htmlspecialchars($row['companyname']) ?></option>
        <?php endwhile; ?>
    </select>
    <input type="submit" name="delete" value="Delete">
</form>

<?php include '../includes/footer.php'; ?>
