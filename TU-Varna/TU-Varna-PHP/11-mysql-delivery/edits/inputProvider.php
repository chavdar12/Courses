<?php include '../includes/header.php'; ?>
<h2>Add Provider</h2>

<?php
include '../db/config.php';

if (isset($_POST['submit'])) {
    $fields = ['firm', 'bul', 'town', 'tel', 'year', 'contact'];
    $values = array_map(fn ($field) => trim($_POST[$field] ?? ''), $fields);

    if (!in_array('', $values, true)) {
        [$firm, $bul, $town, $tel, $year, $contact] = $values;
        $stmt = $conn->prepare(
            'INSERT INTO companyinfo (companyname, companynum, townname, companytel, companyyear, companycontact)
             VALUES (?, ?, ?, ?, ?, ?)'
        );
        $stmt->bind_param('ssssis', $firm, $bul, $town, $tel, $year, $contact);
        if ($stmt->execute()) {
            echo "<p style='text-align:center; color:green;'>Provider added successfully!</p>";
        } else {
            echo "<p style='text-align:center; color:red;'>Error: " . htmlspecialchars($conn->error) . '</p>';
        }
    } else {
        echo "<p style='text-align:center; color:red;'>Please fill in all the fields.</p>";
    }
}

// companyinfo stores the town by name, so the option value is the name
$options = '';
$result = $conn->query('SELECT townname FROM towns ORDER BY townname');
while ($row = $result->fetch_assoc()) {
    $town = htmlspecialchars($row['townname']);
    $options .= "<option value=\"$town\">$town</option>";
}
?>

<form method="post">
    <label for="firm">Firm:</label>
    <input type="text" id="firm" name="firm" required>
    <label for="bul">Bulstat:</label>
    <input type="text" id="bul" name="bul" required>
    <label for="town">Town:</label>
    <select id="town" name="town" required>
        <option value="">Select Town</option>
        <?= $options ?>
    </select>
    <label for="tel">Phone:</label>
    <input type="text" id="tel" name="tel" required>
    <label for="year">Year of Registration:</label>
    <input type="number" id="year" name="year" required>
    <label for="contact">Contact Person:</label>
    <input type="text" id="contact" name="contact" required>
    <input type="submit" name="submit" value="Submit">
</form>

<?php include '../includes/footer.php'; ?>
