# SoftUni · C#

10 courses · .NET, SQL · part of [Courses](../README.md), one Nx workspace for all of them.

Each course folder has its own README with every lecture and exercise.

| Course | What it covers | Stack | Nx project |
| ------ | -------------- | ----- | ---------- |
| [ASP Net Core](ASP-Net-Core) | MVC and Razor, filters and middleware, model binding and validation, Web API, Identity and JWT, testing, layered architecture, caching, SignalR, deployment and Blazor. | .NET | `cs-asp-net-core` |
| [CS Advanced](CS-Advanced) | Stacks and queues, multidimensional arrays, sets and dictionaries, streams / files / directories, functional programming, defining classes, generics, iterators and comparators. | .NET | `cs-advanced` |
| [CS OOP](CS-OOP) | Inheritance, encapsulation, interfaces and abstraction, polymorphism, SOLID, reflection and attributes, unit testing with NUnit, mocking and TDD, and design patterns. | .NET | `cs-oop` |
| [CS Web Basics](CS-Web-Basics) | Threads and async tasks, and the SIS web server built from raw sockets (HTTP parsing, routing, then cookies and sessions). | .NET | `cs-web-basics` |
| [Data Structures Advanced](Data-Structures-Advanced) | AVL, 2-3, red-black and AA trees, hash tables and augmented data structures. | .NET | `cs-data-structures-advanced` |
| [Data Structures Fundamentals](Data-Structures-Fundamentals) | Hand-written lists, stacks, queues, linked lists, trees with BFS / DFS, heaps, priority queues and binary search trees. | .NET | `cs-data-structures-fundamentals` |
| [Entity Framework Core](Entity-Framework-Core) | ADO.NET, a hand-made ORM, EF Core database-first and code-first, relations, LINQ and advanced querying, AutoMapper, JSON / XML import and export, and a layered architecture exercise. | .NET | `cs-entity-framework-core` |
| [MsSQL](MsSQL) | DDL and data types, CRUD, built-in functions, table relations, joins and subqueries, indices and aggregation, functions, stored procedures, triggers and transactions. | SQL | `cs-mssql` |
| [Programming Basics](Programming-Basics) | Simple calculations, conditional statements, for and while loops and nested loops. | .NET | `cs-programming-basics` |
| [Programming Fundamentals](Programming-Fundamentals) | Basic syntax, data types, arrays, methods, lists, objects and classes, associative arrays, text processing and regular expressions. | .NET | `cs-programming-fundamentals` |

## Run

From the repository root:

```bash
npx nx run-many -t format test --projects 'tag:track:SoftUni-CS'   # every course in this track
npx nx run <nx-project>:test                                        # one course (Nx project column)
```
