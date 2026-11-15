"""Runs this lesson's scripts with the examples from the course PDF."""

import subprocess
import sys
import unittest
from pathlib import Path

HERE = Path(__file__).resolve().parent


def run(script, stdin, cwd=HERE):
    return subprocess.run(
        [sys.executable, str(cwd / script)],
        input="\n".join(map(str, stdin)) + "\n",
        capture_output=True,
        text=True,
        timeout=10,
        cwd=cwd,
    )


def lines(text, unordered=False):
    result = [line.rstrip() for line in text.strip().splitlines()]
    return sorted(result) if unordered else result


# (script, stdin lines, expected stdout, compare lines unordered?)
STDIN_CASES = [
    ("001_ascii_values.py", ["a, b, c, a"], "{'a': 97, 'b': 98, 'c': 99}", False),
    ("002_no_vowels.py", ["Python"], "Pythn", False),
    ("002_no_vowels.py", ["ILovePython"], "LvPythn", False),
    ("003_even_matrix.py", [2, "1, 2, 3", "4, 5, 6"], "[[2], [4, 6]]", False),
    (
        "003_even_matrix.py",
        [4, "10, 33, 24, 5, 1", "67, 34, 11, 110, 3", "4, 12, 35, 8", "1, 2"],
        "[[10, 24], [34, 110], [4, 12, 8], [2]]",
        False,
    ),
    ("004_flattening_matrix.py", [2, "1, 2, 3", "4, 5, 6"], "[1, 2, 3, 4, 5, 6]", False),
    (
        "004_flattening_matrix.py",
        [3, "10, 2, 21, 4", "7", "-3, -2"],
        "[10, 2, 21, 4, 7, -3, -2]",
        False,
    ),
    ("005_filter_numbers.py", [1, 10], "[2, 3, 4, 5, 6, 7, 8, 9, 10]", False),
    ("005_filter_numbers.py", [11, 20], "[12, 14, 15, 16, 18, 20]", False),
]


class TestStdinScripts(unittest.TestCase):
    def test_examples(self):
        for script, stdin, expected, unordered in STDIN_CASES:
            with self.subTest(script=script, stdin=stdin):
                result = run(script, stdin)
                self.assertEqual(result.returncode, 0, result.stderr)
                self.assertEqual(lines(result.stdout, unordered), lines(expected, unordered))


if __name__ == "__main__":
    unittest.main()
