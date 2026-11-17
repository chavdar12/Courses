"""Runs this lesson's scripts with the examples from the course PDF."""

import os
import shutil
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path

HERE = Path(__file__).resolve().parent


def run(script, stdin, cwd=HERE, env=None):
    return subprocess.run(
        [sys.executable, str(cwd / script)],
        input="\n".join(map(str, stdin)) + "\n",
        capture_output=True,
        text=True,
        timeout=10,
        cwd=cwd,
        env=env,
    )


def lines(text, unordered=False):
    result = [line.rstrip() for line in text.strip().splitlines()]
    return sorted(result) if unordered else result


class TestExerciseFileHandling(unittest.TestCase):
    """Runs the scripts in a temporary copy of this lesson, so files they create never touch the repo."""

    def setUp(self):
        self.tmp = Path(tempfile.mkdtemp())
        self.lesson = shutil.copytree(HERE, self.tmp / HERE.name)

    def tearDown(self):
        shutil.rmtree(self.tmp)

    def test_even_lines(self):
        expected = [
            "fault@ his wasn't it but him@ judge to quick was @I",
            "safer@ is here…It hide @Quick@",
        ]
        for name in ("001_even_lines.py", "002_even_lines_with_regex.py"):
            with self.subTest(name=name):
                self.assertEqual(lines(run(name, [], cwd=self.lesson).stdout), expected)

    def test_line_numbers(self):
        run("003_line_numbers.py", [], cwd=self.lesson)
        self.assertEqual(
            lines((self.lesson / "line_numbers_output.txt").read_text()),
            [
                "Line 1: -I was quick to judge him, but it wasn't his fault. (37)(4)",
                "Line 2: -Is this some kind of joke?! Is it? (24)(4)",
                "Line 3: -Quick, hide here…It is safer. (22)(4)",
            ],
        )

    def test_file_manipulator(self):
        result = run(
            "004_file_manipulator.py",
            [
                "Create-file.txt",
                "Add-file.txt-First Line",
                "Add-file.txt-Second Line",
                "Replace-random.txt-Some-some",
                "Replace-file.txt-First-1st",
                "Replace-file.txt-Second-2nd",
                "Delete-random.txt",
                "End",
            ],
            cwd=self.lesson,
        )
        self.assertEqual(lines(result.stdout), ["An error occurred", "An error occurred"])
        self.assertEqual((self.lesson / "file.txt").read_text(), "1st Line\n2nd Line\n")

    def test_directory_traversal(self):
        home, target = self.tmp / "home", self.tmp / "target"
        (home / "Desktop").mkdir(parents=True)
        target.mkdir()
        for name in ("main.py", "notes.txt", "app.py", "data.csv"):
            (target / name).touch()
        result = run(
            "005_directory_traversal.py",
            [target],
            cwd=self.lesson,
            env={**os.environ, "HOME": str(home)},
        )
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(
            lines((home / "Desktop" / "report.txt").read_text()),
            [".csv", "---data.csv", ".py", "---app.py", "---main.py", ".txt", "---notes.txt"],
        )


if __name__ == "__main__":
    unittest.main()
