# SoftUni · Java

13 courses · Java, Node.js, SQL · part of [Courses](../README.md), one Nx workspace for all of them.

Each course folder has its own README with every lecture and exercise.

| Course | What it covers | Stack | Nx project |
| ------ | -------------- | ----- | ---------- |
| [Algorithms Advanced](Algorithms-Advanced) | Dijkstra and minimum spanning trees, Bellman-Ford and longest path in a DAG, strongly connected components and max flow, and advanced dynamic programming. | Java | `java-algorithms-advanced` |
| [Algorithms Fundamentals](Algorithms-Fundamentals) | Recursion and backtracking, combinatorics, searching, sorting and greedy algorithms, graph traversal and shortest paths, and dynamic programming. | Java | `java-algorithms-fundamentals` |
| [Data Structures Advanced](Data-Structures-Advanced) | 2-3 trees, AVL, red-black and AA trees, hash tables, augmented data structures and the exam-prep tasks, each with JUnit tests. | Java | `java-data-structures-advanced` |
| [Data Structures Fundamentals](Data-Structures-Fundamentals) | Hand-written array lists, linked lists, stacks, queues, deques, trees with BFS / DFS, heaps, priority queues and binary search trees, each with JUnit tests. | Java | `java-data-structures-fundamentals` |
| [Java Advanced](Java-Advanced) | Stacks and queues, multidimensional arrays, sets and maps, streams / files / directories, functional programming, defining classes, generics, iterators and comparators. | Java | `java-advanced` |
| [Java OOP](Java-OOP) | Abstraction, encapsulation, inheritance, interfaces, polymorphism, SOLID, reflection and annotations, unit testing and TDD, design patterns and exception handling, plus two workshops. | Java | `java-oop` |
| [MySQL](MySQL) | DDL and data types, CRUD, built-in functions, aggregation, table relations, joins and subqueries, stored procedures, triggers and transactions, against SoftUni's sample databases. | SQL | `java-mysql` |
| [Programming Basics](Programming-Basics) | Simple calculations, conditional statements, for and while loops, nested loops and exam preparation. | Java | `java-programming-basics` |
| [Programming Fundamentals](Programming-Fundamentals) | Basic syntax, data types, arrays, methods, lists, objects and classes, associative arrays, text processing and regular expressions. | Java | `java-programming-fundamentals` |
| [Spring Advanced Final Project](Spring-Advanced-Final-Project) | Post, search and favorite advertisements, browse by region, and chat with other users in real time. | Java, Node.js | `java-spring-advanced-final-project` |
| [Spring Advanced](Spring-Advanced) | REST controllers, Spring Security, HATEOAS, error handling, events and scheduling, AOP, testing, OpenAPI + Docker and Actuator monitoring. | Java | `java-spring-advanced` |
| [Spring Data](Spring-Data) | JDBC, a hand-made ORM, Hibernate / JPA code first, Spring Data repositories and queries, DTO mapping with ModelMapper, and JSON (Gson). | Java | `java-spring-data` |
| [Spring Fundamentals](Spring-Fundamentals) | Spring Boot, MVC with Thymeleaf, state management, validation, the Mobilele and Pathfinder apps, and the exam projects. | Java, Node.js | `java-spring-fundamentals` |

## Run

From the repository root:

```bash
npx nx run-many -t format test --projects 'tag:track:SoftUni-Java'   # every course in this track
npx nx run <nx-project>:test                                        # one course (Nx project column)
```
