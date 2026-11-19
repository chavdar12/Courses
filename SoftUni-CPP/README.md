# SoftUni · C++

4 courses · C++ · part of [Courses](../README.md), one Nx workspace for all of them.

Each course folder has its own README with every lecture and exercise.

| Course | What it covers | Stack | Nx project |
| ------ | -------------- | ----- | ---------- |
| [CPP Advanced](CPP-Advanced) | Stacks and queues, maps and sets, multidimensional arrays, memory, references and pointers. | C++ | `cpp-advanced` |
| [CPP OOP](CPP-OOP) | Objects and classes, code organization and templates, constructors, the rule of 3/5/0, inheritance, polymorphism and abstract classes. | C++ | `cpp-oop` |
| [Programming Basics](Programming-Basics) | Simple calculations, conditional statements, for and while loops and nested loops. | C++ | `cpp-programming-basics` |
| [Programming Fundamentals](Programming-Fundamentals) | Basic syntax, functions, arrays, strings and streams, vectors, lists and iterators. | C++ | `cpp-programming-fundamentals` |

## Run

From the repository root:

```bash
npx nx run-many -t format test --projects 'tag:track:SoftUni-CPP'   # every course in this track
npx nx run <nx-project>:test                                        # one course (Nx project column)
```
