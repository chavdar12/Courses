"""Runs this lesson's scripts with the examples from the course PDF."""
import subprocess
import sys
import unittest
from pathlib import Path

HERE = Path(__file__).resolve().parent


def run(script, stdin, cwd=HERE):
    return subprocess.run([sys.executable, str(cwd / script)], input="\n".join(map(str, stdin)) + "\n",
                          capture_output=True, text=True, timeout=10, cwd=cwd)


def lines(text, unordered=False):
    result = [line.rstrip() for line in text.strip().splitlines()]
    return sorted(result) if unordered else result


# (script, stdin lines, expected stdout, compare lines unordered?)
STDIN_CASES = [('001_word_filter.py', ['kiwi orange banana apple'], 'kiwi\norange\nbanana', False),
 ('002_words_lengths.py', ['Peter, Bob, Kate'], 'Peter -> 5, Bob -> 3, Kate -> 4', False),
 ('003_capitals.py',
  ['Bulgaria, Romania, Germany, England', 'Sofia, Bucharest, Berlin, London'],
  'Bulgaria -> Sofia\nRomania -> Bucharest\nGermany -> Berlin\nEngland -> London',
  False),
 ('004_number_classification.py',
  ['1, -2, 0, 5, 3, 4, -100, -20, 12, 19, -33'],
  'Positive: 1, 0, 5, 3, 4, 12, 19\nNegative: -2, -100, -20, -33\n'
  'Even: -2, 0, 4, -100, -20, 12\nOdd: 1, 5, 3, 19, -33',
  False),
 ('005_diagonals.py',
  [3, '1, 2, 3', '4, 5, 6', '7, 8, 9'],
  'First diagonal: 1, 5, 9. Sum: 15\nSecond diagonal: 3, 5, 7. Sum: 15',
  False),
 ('006_matrix_of_palindromes.py',
  ['4 6'],
  'aaa aba aca ada aea afa\nbbb bcb bdb beb bfb bgb\nccc cdc cec cfc cgc chc\nddd ded dfd dgd dhd did',
  False),
 ('006_matrix_of_palindromes.py', ['3 2'], 'aaa aba\nbbb bcb\nccc cdc', False),
 ('007_flatten_lists.py', ['1 2 3 |4 5 6 |  7  88'], '7 88 4 5 6 1 2 3', False),
 ('007_flatten_lists.py', ['7 | 4  5|1 0| 2 5 |3'], '3 2 5 1 0 4 5 7', False),
 ('008_heroes_inventory.py',
  ['Peter, Jacob, Ivan', 'Peter-Shield-90', 'Jacob-Bow-50', 'Peter-Shield-500',
   'Ivan-Sword-120', 'Ivan-Axe-200', 'End'],
  'Peter -> Items: 1, Cost: 90\nJacob -> Items: 1, Cost: 50\nIvan -> Items: 2, Cost: 320',
  False),
 ('009_bunker.py',
  ['food, water, medicine', 6,
   'food - canned soup - quantity:10;quality:5',
   'water - bottled water - quantity:20;quality:10',
   'medicine - antibiotics - quantity:5;quality:30',
   'food - canned fish - quantity:5;quality:10',
   'water - 5L water - quantity:10;quality:15',
   'medicine - painkillers - quantity:5;quality:20'],
  'Count of items: 55\nAverage quality: 30.00\nfood -> canned soup, canned fish\n'
  'water -> bottled water, 5L water\nmedicine -> antibiotics, painkillers',
  False),
 ('010_matrix_modification.py',
  [3, '1 2 3', '4 5 6', '7 8 9', 'Add 0 0 5', 'Subtract 1 1 2', 'END'],
  '6 2 3\n4 3 6\n7 8 9',
  False),
 ('010_matrix_modification.py',
  [4, '1 2 3 4', '5 6 7 8', '8 7 6 5', '4 3 2 1', 'Add 4 4 100', 'Add 3 3 100',
   'Subtract -1 -1 42', 'Subtract 0 0 42', 'END'],
  'Invalid coordinates\nInvalid coordinates\n-41 2 3 4\n5 6 7 8\n8 7 6 5\n4 3 2 101',
  False)]


class TestStdinScripts(unittest.TestCase):
    def test_examples(self):
        for script, stdin, expected, unordered in STDIN_CASES:
            with self.subTest(script=script, stdin=stdin):
                result = run(script, stdin)
                self.assertEqual(result.returncode, 0, result.stderr)
                self.assertEqual(lines(result.stdout, unordered), lines(expected, unordered))


if __name__ == "__main__":
    unittest.main()
