<?php
require_once __DIR__ . '/../db/books.php';

$books = getBooks();

echo '<table border="7">
        <thead>
            <tr>
                <th>Номер</th>
                <th>Заглавие</th>
                <th>Автор</th>
                <th>Издателство</th>
                <th>Година</th>
            </tr>
        </thead>';

while ($row = $books->fetch_assoc()) {
    echo '<tr>
            <td>' . htmlspecialchars($row['id']) . '</td>
            <td>' . htmlspecialchars($row['title']) . '</td>
            <td>' . htmlspecialchars($row['author']) . '</td>
            <td>' . htmlspecialchars($row['publisher']) . '</td>
            <td>' . htmlspecialchars($row['year']) . '</td>
          </tr>';
}

echo '</table>';
