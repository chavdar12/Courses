# SoftUni · QA

5 courses · .NET, Node.js · part of [Courses](../README.md), one Nx workspace for all of them.

Each course folder has its own README with every lecture and exercise.

| Course | What it covers | Stack | Nx project |
| ------ | -------------- | ----- | ---------- |
| [Back End Technologies Basics](Back-End-Technologies-Basics) | JSON / YAML / XML, JavaScript basics, unit and integration testing, mocking, REST API testing, code coverage, mutation testing and Docker; C# with NUnit and JavaScript with Mocha + Chai. | .NET, Node.js | `qa-back-end-technologies-basics` |
| [Front End Technologies Basics](Front-End-Technologies-Basics) | HTML & CSS pages, async JavaScript, DOM, single page apps and testing them with QUnit, Jasmine and Playwright. | Node.js | `qa-front-end-technologies-basics` |
| [Front End Test Automation](Front-End-Test-Automation) | Selenium IDE, Selenium WebDriver, Page Object Model, Appium, SikuliX and security testing. | .NET | `qa-front-end-test-automation` |
| [Programming Advanced for QA](Programming-Advanced-for-QA) | Text processing and regex, dictionaries and LINQ, classes, exception handling and OOP in C# with NUnit tests for each topic, then JavaScript with Mocha + Chai. | .NET, Node.js | `qa-programming-advanced-for-qa` |
| [Programming Fundamentals and Unit Testing](Programming-Fundamentals-and-Unit-Testing) | C# from simple commands through conditionals, loops, methods, arrays and lists, with NUnit tests for every exercise and dedicated unit-testing lectures. | .NET | `qa-programming-fundamentals-and-unit-testing` |

## Run

From the repository root:

```bash
npx nx run-many -t format test --projects 'tag:track:SoftUni-QA'   # every course in this track
npx nx run <nx-project>:test                                        # one course (Nx project column)
```
