# Strypes

1 course · Python · part of [Courses](../README.md), one Nx workspace for all of them.

Each course folder has its own README with every lecture and exercise.

| Course | What it covers | Stack | Nx project |
| ------ | -------------- | ----- | ---------- |
| [Stypress Python](Stypress-Python) | From the language basics through OOP, files, databases, design patterns, Tkinter GUIs and the Linux shell. | Python | `stypress-python` |

## Run

From the repository root:

```bash
npx nx run-many -t format test --projects 'tag:track:Stypress'   # every course in this track
npx nx run <nx-project>:test                                        # one course (Nx project column)
```
