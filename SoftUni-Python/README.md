# SoftUni · Python

6 courses · Python · part of [Courses](../README.md), one Nx workspace for all of them.

Each course folder has its own README with every lecture and exercise.

| Course | What it covers | Stack | Nx project |
| ------ | -------------- | ----- | ---------- |
| [Programming Basics](Programming-Basics) | Simple calculations, conditional statements, for and while loops, nested loops and exam preparation. | Python | `python-programming-basics` |
| [Programming Fundamentals](Programming-Fundamentals) | Data types, lists, functions, objects and classes, dictionaries, text processing, regular expressions, bitwise operations and mid / final exam preparation. | Python | `python-programming-fundamentals` |
| [Python Advanced](Python-Advanced) | Stacks and queues, tuples and sets, multidimensional lists, comprehensions, advanced functions, file handling, modules, error handling, two console game workshops and exam preparation. | Python | `python-advanced` |
| [Python OOP](Python-OOP) | Classes and objects, inheritance, encapsulation, static and class methods, polymorphism and abstraction, SOLID, iterators and generators, decorators, unit testing and design patterns. | Python | `python-oop` |
| [Python Web Basics](Python-Web-Basics) | URLs and templates, the HTTP protocol, models and the MTV pattern, forms, model forms, testing, the Petstagram workshop and an exam-prep project. | Python | `python-web-basics` |
| [Python Web Framework](Python-Web-Framework) | Django 5.2: PostgreSQL, advanced templates, media files, authentication and user forms, class-based views, Django REST Framework, async tasks and deployment, in three workshop parts. | Python | `python-web-framework` |

## Run

From the repository root:

```bash
npx nx run-many -t format test --projects 'tag:track:SoftUni-Python'   # every course in this track
npx nx run <nx-project>:test                                        # one course (Nx project column)
```
