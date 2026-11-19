# Courses

[![CI](https://github.com/chavdar12/Courses/actions/workflows/ci.yml/badge.svg)](https://github.com/chavdar12/Courses/actions/workflows/ci.yml)
[![CodeQL](https://github.com/chavdar12/Courses/actions/workflows/codeql.yml/badge.svg)](https://github.com/chavdar12/Courses/actions/workflows/codeql.yml)

My solutions to 63 programming courses in one repository: the SoftUni Java, C#, JavaScript, Python, C++, PHP and QA
tracks, plus Udemy, HackerRank, Ultimate Courses, Strypes and the Technical University of Varna. Every exercise comes with tests,
and every course builds and tests on its own.

It is an [Nx](https://nx.dev) workspace: each course is one Nx project, so a change only rebuilds the courses it
touches, and unchanged courses come from the cache.

## Courses

### SoftUni · Java

| Course | What it covers | Stack | Nx project |
| ------ | -------------- | ----- | ---------- |
| [Algorithms Advanced](SoftUni-Java/Algorithms-Advanced) | Dijkstra and minimum spanning trees, Bellman-Ford and longest path in a DAG, strongly connected components and max flow, and advanced dynamic programming. | Java | `java-algorithms-advanced` |
| [Algorithms Fundamentals](SoftUni-Java/Algorithms-Fundamentals) | Recursion and backtracking, combinatorics, searching, sorting and greedy algorithms, graph traversal and shortest paths, and dynamic programming. | Java | `java-algorithms-fundamentals` |
| [Data Structures Advanced](SoftUni-Java/Data-Structures-Advanced) | 2-3 trees, AVL, red-black and AA trees, hash tables, augmented data structures and the exam-prep tasks, each with JUnit tests. | Java | `java-data-structures-advanced` |
| [Data Structures Fundamentals](SoftUni-Java/Data-Structures-Fundamentals) | Hand-written array lists, linked lists, stacks, queues, deques, trees with BFS / DFS, heaps, priority queues and binary search trees, each with JUnit tests. | Java | `java-data-structures-fundamentals` |
| [Java Advanced](SoftUni-Java/Java-Advanced) | Stacks and queues, multidimensional arrays, sets and maps, streams / files / directories, functional programming, defining classes, generics, iterators and comparators. | Java | `java-advanced` |
| [Java OOP](SoftUni-Java/Java-OOP) | Abstraction, encapsulation, inheritance, interfaces, polymorphism, SOLID, reflection and annotations, unit testing and TDD, design patterns and exception handling, plus two workshops. | Java | `java-oop` |
| [MySQL](SoftUni-Java/MySQL) | DDL and data types, CRUD, built-in functions, aggregation, table relations, joins and subqueries, stored procedures, triggers and transactions, against SoftUni's sample databases. | SQL | `java-mysql` |
| [Programming Basics](SoftUni-Java/Programming-Basics) | Simple calculations, conditional statements, for and while loops, nested loops and exam preparation. | Java | `java-programming-basics` |
| [Programming Fundamentals](SoftUni-Java/Programming-Fundamentals) | Basic syntax, data types, arrays, methods, lists, objects and classes, associative arrays, text processing and regular expressions. | Java | `java-programming-fundamentals` |
| [Spring Advanced Final Project](SoftUni-Java/Spring-Advanced-Final-Project) | Post, search and favorite advertisements, browse by region, and chat with other users in real time. | Java, Node.js | `java-spring-advanced-final-project` |
| [Spring Advanced](SoftUni-Java/Spring-Advanced) | REST controllers, Spring Security, HATEOAS, error handling, events and scheduling, AOP, testing, OpenAPI + Docker and Actuator monitoring. | Java | `java-spring-advanced` |
| [Spring Data](SoftUni-Java/Spring-Data) | JDBC, a hand-made ORM, Hibernate / JPA code first, Spring Data repositories and queries, DTO mapping with ModelMapper, and JSON (Gson). | Java | `java-spring-data` |
| [Spring Fundamentals](SoftUni-Java/Spring-Fundamentals) | Spring Boot, MVC with Thymeleaf, state management, validation, the Mobilele and Pathfinder apps, and the exam projects. | Java, Node.js | `java-spring-fundamentals` |

### SoftUni · C#

| Course | What it covers | Stack | Nx project |
| ------ | -------------- | ----- | ---------- |
| [ASP Net Core](SoftUni-CS/ASP-Net-Core) | MVC and Razor, filters and middleware, model binding and validation, Web API, Identity and JWT, testing, layered architecture, caching, SignalR, deployment and Blazor. | .NET | `cs-asp-net-core` |
| [CS Advanced](SoftUni-CS/CS-Advanced) | Stacks and queues, multidimensional arrays, sets and dictionaries, streams / files / directories, functional programming, defining classes, generics, iterators and comparators. | .NET | `cs-advanced` |
| [CS OOP](SoftUni-CS/CS-OOP) | Inheritance, encapsulation, interfaces and abstraction, polymorphism, SOLID, reflection and attributes, unit testing with NUnit, mocking and TDD, and design patterns. | .NET | `cs-oop` |
| [CS Web Basics](SoftUni-CS/CS-Web-Basics) | Threads and async tasks, and the SIS web server built from raw sockets (HTTP parsing, routing, then cookies and sessions). | .NET | `cs-web-basics` |
| [Data Structures Advanced](SoftUni-CS/Data-Structures-Advanced) | AVL, 2-3, red-black and AA trees, hash tables and augmented data structures. | .NET | `cs-data-structures-advanced` |
| [Data Structures Fundamentals](SoftUni-CS/Data-Structures-Fundamentals) | Hand-written lists, stacks, queues, linked lists, trees with BFS / DFS, heaps, priority queues and binary search trees. | .NET | `cs-data-structures-fundamentals` |
| [Entity Framework Core](SoftUni-CS/Entity-Framework-Core) | ADO.NET, a hand-made ORM, EF Core database-first and code-first, relations, LINQ and advanced querying, AutoMapper, JSON / XML import and export, and a layered architecture exercise. | .NET | `cs-entity-framework-core` |
| [MsSQL](SoftUni-CS/MsSQL) | DDL and data types, CRUD, built-in functions, table relations, joins and subqueries, indices and aggregation, functions, stored procedures, triggers and transactions. | SQL | `cs-mssql` |
| [Programming Basics](SoftUni-CS/Programming-Basics) | Simple calculations, conditional statements, for and while loops and nested loops. | .NET | `cs-programming-basics` |
| [Programming Fundamentals](SoftUni-CS/Programming-Fundamentals) | Basic syntax, data types, arrays, methods, lists, objects and classes, associative arrays, text processing and regular expressions. | .NET | `cs-programming-fundamentals` |

### SoftUni · JavaScript

| Course | What it covers | Stack | Nx project |
| ------ | -------------- | ----- | ---------- |
| [Angular](SoftUni-JS/Angular) | One self-contained Angular 22 app per lecture (standalone components, signals, Vitest via `ng test`), plus a TypeScript playground for the intro lecture. | Node.js | `js-angular` |
| [HTML and CSS](SoftUni-JS/HTML-and-CSS) | HTML structure and forms, CSS typography, the box model, positioning and grid, flexbox and media queries; every exercise is checked with html-validate. | Node.js | `js-html-and-css` |
| [JS Advanced](SoftUni-JS/JS-Advanced) | Syntax and functions, arrays, objects and composition, DOM and events, advanced functions, unit testing with Mocha + Chai, classes, prototypes and inheritance, and exam preparation. | Node.js | `js-advanced` |
| [JS Applications](SoftUni-JS/JS-Applications) | REST services, async programming, remote data and authentication, single page applications, architecture and testing, client-side rendering with lit-html, routing, modular apps and two exam-prep SPAs. | Node.js | `js-applications` |
| [JS Back End](SoftUni-JS/JS-Back-End) | A Node.js `http` server, the Cubicle workshop (Express + Handlebars, then MongoDB / Mongoose, then authentication with bcrypt and JWT). | Node.js | `js-back-end` |
| [Programming Basics](SoftUni-JS/Programming-Basics) | Simple calculations, conditional statements, for and while loops, nested loops and exam preparation. | Node.js | `js-programming-basics` |
| [Programming Fundamentals](SoftUni-JS/Programming-Fundamentals) | Data types, arrays, functions, advanced arrays, objects and classes, associative arrays and text processing. | Node.js | `js-programming-fundamentals` |
| [React Final Project](SoftUni-JS/React-Final-Project) | Hospital management app: patients book appointments, doctors prescribe, admins manage doctors. | Node.js | `js-react-final-project` |
| [ReactJS](SoftUni-JS/ReactJS) | One self-contained React 19 + TypeScript + Vite app per lecture, each with its own Vitest + Testing Library tests. | Node.js | `js-reactjs` |

### SoftUni · Python

| Course | What it covers | Stack | Nx project |
| ------ | -------------- | ----- | ---------- |
| [Programming Basics](SoftUni-Python/Programming-Basics) | Simple calculations, conditional statements, for and while loops, nested loops and exam preparation. | Python | `python-programming-basics` |
| [Programming Fundamentals](SoftUni-Python/Programming-Fundamentals) | Data types, lists, functions, objects and classes, dictionaries, text processing, regular expressions, bitwise operations and mid / final exam preparation. | Python | `python-programming-fundamentals` |
| [Python Advanced](SoftUni-Python/Python-Advanced) | Stacks and queues, tuples and sets, multidimensional lists, comprehensions, advanced functions, file handling, modules, error handling, two console game workshops and exam preparation. | Python | `python-advanced` |
| [Python OOP](SoftUni-Python/Python-OOP) | Classes and objects, inheritance, encapsulation, static and class methods, polymorphism and abstraction, SOLID, iterators and generators, decorators, unit testing and design patterns. | Python | `python-oop` |
| [Python Web Basics](SoftUni-Python/Python-Web-Basics) | URLs and templates, the HTTP protocol, models and the MTV pattern, forms, model forms, testing, the Petstagram workshop and an exam-prep project. | Python | `python-web-basics` |
| [Python Web Framework](SoftUni-Python/Python-Web-Framework) | Django 5.2: PostgreSQL, advanced templates, media files, authentication and user forms, class-based views, Django REST Framework, async tasks and deployment, in three workshop parts. | Python | `python-web-framework` |

### SoftUni · C++

| Course | What it covers | Stack | Nx project |
| ------ | -------------- | ----- | ---------- |
| [CPP Advanced](SoftUni-CPP/CPP-Advanced) | Stacks and queues, maps and sets, multidimensional arrays, memory, references and pointers. | C++ | `cpp-advanced` |
| [CPP OOP](SoftUni-CPP/CPP-OOP) | Objects and classes, code organization and templates, constructors, the rule of 3/5/0, inheritance, polymorphism and abstract classes. | C++ | `cpp-oop` |
| [Programming Basics](SoftUni-CPP/Programming-Basics) | Simple calculations, conditional statements, for and while loops and nested loops. | C++ | `cpp-programming-basics` |
| [Programming Fundamentals](SoftUni-CPP/Programming-Fundamentals) | Basic syntax, functions, arrays, strings and streams, vectors, lists and iterators. | C++ | `cpp-programming-fundamentals` |

### SoftUni · PHP

| Course | What it covers | Stack | Nx project |
| ------ | -------------- | ----- | ---------- |
| [PHP Fundamentals](SoftUni-PHP/PHP-Fundamentals) | Console problems on syntax, arrays, functions, OOP basics, associative arrays, text processing and regex, plus the HTML/CSS lectures and a small web project. | PHP | `php-fundamentals` |
| [PHP Web Development Basics](SoftUni-PHP/PHP-Web-Development-Basics) | Advanced syntax, HTTP and HTML forms, MySQL-backed apps, OOP, sessions and authentication, routing, REST + AJAX, and the workshops that grow into a small MVC framework. | PHP | `php-web-development-basics` |

### SoftUni · QA

| Course | What it covers | Stack | Nx project |
| ------ | -------------- | ----- | ---------- |
| [Back End Technologies Basics](SoftUni-QA/Back-End-Technologies-Basics) | JSON / YAML / XML, JavaScript basics, unit and integration testing, mocking, REST API testing, code coverage, mutation testing and Docker; C# with NUnit and JavaScript with Mocha + Chai. | .NET, Node.js | `qa-back-end-technologies-basics` |
| [Front End Technologies Basics](SoftUni-QA/Front-End-Technologies-Basics) | HTML & CSS pages, async JavaScript, DOM, single page apps and testing them with QUnit, Jasmine and Playwright. | Node.js | `qa-front-end-technologies-basics` |
| [Front End Test Automation](SoftUni-QA/Front-End-Test-Automation) | Selenium IDE, Selenium WebDriver, Page Object Model, Appium, SikuliX and security testing. | .NET | `qa-front-end-test-automation` |
| [Programming Advanced for QA](SoftUni-QA/Programming-Advanced-for-QA) | Text processing and regex, dictionaries and LINQ, classes, exception handling and OOP in C# with NUnit tests for each topic, then JavaScript with Mocha + Chai. | .NET, Node.js | `qa-programming-advanced-for-qa` |
| [Programming Fundamentals and Unit Testing](SoftUni-QA/Programming-Fundamentals-and-Unit-Testing) | C# from simple commands through conditionals, loops, methods, arrays and lists, with NUnit tests for every exercise and dedicated unit-testing lectures. | .NET | `qa-programming-fundamentals-and-unit-testing` |

### Udemy

| Course | What it covers | Stack | Nx project |
| ------ | -------------- | ----- | ---------- |
| [Angular – The Complete Guide](Udemy/Angular-The-Complete-Guide) | One Angular 22 app per section: components, directives, pipes, services and DI, change detection, RxJS, HTTP, forms, routing, lazy loading and SSR. | Node.js | `udemy-angular-the-complete-guide` |
| [Java DSA Masterclass](Udemy/Java-DSA-Masterclass) | Big O, recursion, hand-written lists, stacks, queues, trees (BST, AVL), heaps, tries and hash tables, sorting and searching, graphs and shortest paths, greedy, divide and conquer and dynamic programming, plus the interview questions. | Java | `udemy-java-dsa-masterclass` |
| [Laravel & PHP Mastery](Udemy/Laravel-And-PHP-Mastery) | Five Laravel 13 apps: task list, book reviews, an event-management REST API with Sanctum, a Livewire poll and a job board, each with feature tests. | PHP | `udemy-laravel-and-php-mastery` |
| [Modern React with Redux](Udemy/Modern-React-With-Redux) | Twelve React 19 + TypeScript apps from JSX and hooks to API search apps, Redux Toolkit and RTK Query, ending with a streams CRUD app and its own API. | Node.js | `udemy-modern-react-with-redux` |
| [PHP for Beginners – CMS Project](Udemy/PHP-CMS-Project) | Beginner PHP exercises, then a blog CMS in plain PHP 8.5: posts, categories, search, moderated comments, accounts and an admin panel with roles, on PDO with CSRF protection. | PHP | `udemy-php-cms-project` |
| [Spring Microservices](Udemy/Spring-Microservices) | A Spring Boot 4 REST API, then microservices with Spring Cloud: config server, Eureka, OpenFeign, Resilience4j, Gateway and Docker Compose. | Java | `udemy-spring-microservices` |
| [Svelte 5 and SvelteKit](Udemy/Svelte-5-And-SvelteKit) | SvelteKit data loading, then three projects: an ebook landing page with Stripe, a Sanity-powered portfolio and a Supabase + OpenAI book tracker. | Node.js | `udemy-svelte-5-and-sveltekit` |

### HackerRank

| Course | What it covers | Stack | Nx project |
| ------ | -------------- | ----- | ---------- |
| [CPP](HackerRank/CPP) | HackerRank practice problems in C++. | C++ | `hackerrank-cpp` |
| [Java](HackerRank/Java) | HackerRank practice problems in Java. | Java | `hackerrank-java` |
| [Python](HackerRank/Python) | HackerRank practice problems in Python. | Python | `hackerrank-python` |

### Mosh (Ultimate Courses)

| Course | What it covers | Stack | Nx project |
| ------ | -------------- | ----- | ---------- |
| [Ultimate Angular](Mosh/Ultimate-Angular) | Package scaffolds of Ultimate Courses' Angular libraries (lite-store, ngx-fullscreen, ngx-pagevisibility); the library code is not included. | TypeScript | `mosh-ultimate-angular` |
| [Ultimate TypeScript](Mosh/Ultimate-TypeScript) | Package scaffold of Ultimate Courses' `@ultimate/vault` storage utility; the implementation is not included. | TypeScript | `mosh-ultimate-typescript` |

### Technical University of Varna

| Course | What it covers | Stack | Nx project |
| ------ | -------------- | ----- | ---------- |
| [PHP](TU-Varna/PHP) | PHP exercises from the Web Applications course at the Technical University of Varna, organized by topic. | PHP | `tu-varna-php` |

### Strypes

| Course | What it covers | Stack | Nx project |
| ------ | -------------- | ----- | ---------- |
| [Stypress Python](Stypress/Stypress-Python) | From the language basics through OOP, files, databases, design patterns, Tkinter GUIs and the Linux shell. | Python | `stypress-python` |

## Layout

```
<Track>/README.md      the track's courses and how to test just that track
<Track>/<Course>/      a course exactly as it was in its own repository, history included
  project.json         Nx project: test and format targets, track and stack tags
tools/ci.sh            how each stack is built, tested and format-checked
tools/runners/         self-hosted runners for Courses and shoe-sector (Docker Compose)
```

`git log --follow -- <Track>/<Course>/<file>` shows a file's history from before the move.

## Working locally

Needs Node.js 24, plus the toolchain of the courses you run: JDK 25, .NET 10, Python 3.14, PHP 8.5 or CMake.
`mise install` sets all of them up at CI's versions ([`mise.toml`](mise.toml)). VS Code suggests the matching
extensions on open.

```bash
npm install
npx nx graph                                         # browse every course
npx nx run java-oop:test                             # build and test one course
npx nx run java-oop:format                           # check its formatting
npx nx affected -t format test                       # only what changed since main
npx nx run-many -t test --projects=tag:track:SoftUni-Python
npx nx run-many -t test --projects=tag:stack:dotnet
```

## Quality checks

- **CI** ([`ci.yml`](.github/workflows/ci.yml)): Nx works out which courses a push or pull request touched; each one
  gets its own job with only the toolchains it needs, running its formatter check and its tests. A final `result`
  job is the single required check.
- **CodeQL** ([`codeql.yml`](.github/workflows/codeql.yml)): `security-and-quality` analysis for Java, C#,
  JavaScript / TypeScript, Python, C++ and the workflows themselves, on every push, pull request and weekly.
  Findings show up in the Security tab and on pull requests.
- **Dependabot** ([`dependabot.yml`](.github/dependabot.yml)): monthly, grouped updates for npm, Gradle, NuGet, pip
  and GitHub Actions, plus security updates as soon as an advisory lands.
- **Branch protection**: `main` only changes through pull requests that pass CI and introduce no high-severity
  CodeQL alerts; merges are squash-only, and secret scanning with push protection is on.

## License

My code is under the [MIT license](LICENSE). Lecture materials (PDFs, task descriptions) belong to their authors and
are included for reference.
