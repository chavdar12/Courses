# Technical University of Varna

1 course · PHP · part of [Courses](../README.md), one Nx workspace for all of them.

Each course folder has its own README with every lecture and exercise.

| Course | What it covers | Stack | Nx project |
| ------ | -------------- | ----- | ---------- |
| [PHP](PHP) | PHP exercises from the Web Applications course at the Technical University of Varna, organized by topic. | PHP | `tu-varna-php` |

## Run

From the repository root:

```bash
npx nx run-many -t format test --projects 'tag:track:TU-Varna'   # every course in this track
npx nx run <nx-project>:test                                        # one course (Nx project column)
```
