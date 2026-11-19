# HackerRank

3 courses · C++, Java, Python · part of [Courses](../README.md), one Nx workspace for all of them.

Each course folder has its own README with every lecture and exercise.

| Course | What it covers | Stack | Nx project |
| ------ | -------------- | ----- | ---------- |
| [CPP](CPP) | HackerRank practice problems in C++. | C++ | `hackerrank-cpp` |
| [Java](Java) | HackerRank practice problems in Java. | Java | `hackerrank-java` |
| [Python](Python) | HackerRank practice problems in Python. | Python | `hackerrank-python` |

## Run

From the repository root:

```bash
npx nx run-many -t format test --projects 'tag:track:HackerRank'   # every course in this track
npx nx run <nx-project>:test                                        # one course (Nx project column)
```
