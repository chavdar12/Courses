<?php
// A filled 4x4 sudoku: every row, column and 2x2 box holds 1-4 exactly once.
class Fourdoku
{
    private array $matrix;

    public function __construct()
    {
        $this->generate();
    }

    public function generate(): void
    {
        $this->matrix = array_fill(0, 4, array_fill(0, 4, 0));
        $this->fill(0);
    }

    public function getMatrix(): array
    {
        return $this->matrix;
    }

    // backtracking over the 16 cells in row order, trying the numbers in random order
    private function fill(int $cell): bool
    {
        if ($cell === 16) {
            return true;
        }
        $row = intdiv($cell, 4);
        $col = $cell % 4;
        $numbers = [1, 2, 3, 4];
        shuffle($numbers);
        foreach ($numbers as $number) {
            if ($this->fits($row, $col, $number)) {
                $this->matrix[$row][$col] = $number;
                if ($this->fill($cell + 1)) {
                    return true;
                }
            }
        }
        $this->matrix[$row][$col] = 0;
        return false;
    }

    private function fits(int $row, int $col, int $number): bool
    {
        $boxRow = $row - $row % 2;
        $boxCol = $col - $col % 2;
        for ($i = 0; $i < 4; $i++) {
            if ($this->matrix[$row][$i] === $number
                || $this->matrix[$i][$col] === $number
                || $this->matrix[$boxRow + intdiv($i, 2)][$boxCol + $i % 2] === $number) {
                return false;
            }
        }
        return true;
    }

    public function print(): void
    {
        echo "<table>";
        foreach ($this->matrix as $row) {
            echo "<tr>";
            foreach ($row as $value) {
                echo "<td>$value</td>";
            }
            echo "</tr>";
        }
        echo "</table>";
    }
}
