# SoftUni · PHP

2 courses · PHP · part of [Courses](../README.md), one Nx workspace for all of them.

Each course folder has its own README with every lecture and exercise.

| Course | What it covers | Stack | Nx project |
| ------ | -------------- | ----- | ---------- |
| [PHP Fundamentals](PHP-Fundamentals) | Console problems on syntax, arrays, functions, OOP basics, associative arrays, text processing and regex, plus the HTML/CSS lectures and a small web project. | PHP | `php-fundamentals` |
| [PHP Web Development Basics](PHP-Web-Development-Basics) | Advanced syntax, HTTP and HTML forms, MySQL-backed apps, OOP, sessions and authentication, routing, REST + AJAX, and the workshops that grow into a small MVC framework. | PHP | `php-web-development-basics` |

## Run

From the repository root:

```bash
npx nx run-many -t format test --projects 'tag:track:SoftUni-PHP'   # every course in this track
npx nx run <nx-project>:test                                        # one course (Nx project column)
```
