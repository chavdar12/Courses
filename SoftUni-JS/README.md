# SoftUni · JavaScript

9 courses · Node.js · part of [Courses](../README.md), one Nx workspace for all of them.

Each course folder has its own README with every lecture and exercise.

| Course | What it covers | Stack | Nx project |
| ------ | -------------- | ----- | ---------- |
| [Angular](Angular) | One self-contained Angular 22 app per lecture (standalone components, signals, Vitest via `ng test`), plus a TypeScript playground for the intro lecture. | Node.js | `js-angular` |
| [HTML and CSS](HTML-and-CSS) | HTML structure and forms, CSS typography, the box model, positioning and grid, flexbox and media queries; every exercise is checked with html-validate. | Node.js | `js-html-and-css` |
| [JS Advanced](JS-Advanced) | Syntax and functions, arrays, objects and composition, DOM and events, advanced functions, unit testing with Mocha + Chai, classes, prototypes and inheritance, and exam preparation. | Node.js | `js-advanced` |
| [JS Applications](JS-Applications) | REST services, async programming, remote data and authentication, single page applications, architecture and testing, client-side rendering with lit-html, routing, modular apps and two exam-prep SPAs. | Node.js | `js-applications` |
| [JS Back End](JS-Back-End) | A Node.js `http` server, the Cubicle workshop (Express + Handlebars, then MongoDB / Mongoose, then authentication with bcrypt and JWT). | Node.js | `js-back-end` |
| [Programming Basics](Programming-Basics) | Simple calculations, conditional statements, for and while loops, nested loops and exam preparation. | Node.js | `js-programming-basics` |
| [Programming Fundamentals](Programming-Fundamentals) | Data types, arrays, functions, advanced arrays, objects and classes, associative arrays and text processing. | Node.js | `js-programming-fundamentals` |
| [React Final Project](React-Final-Project) | Hospital management app: patients book appointments, doctors prescribe, admins manage doctors. | Node.js | `js-react-final-project` |
| [ReactJS](ReactJS) | One self-contained React 19 + TypeScript + Vite app per lecture, each with its own Vitest + Testing Library tests. | Node.js | `js-reactjs` |

## Run

From the repository root:

```bash
npx nx run-many -t format test --projects 'tag:track:SoftUni-JS'   # every course in this track
npx nx run <nx-project>:test                                        # one course (Nx project column)
```
