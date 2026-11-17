# Courses

Every course solution in one [Nx](https://nx.dev) workspace. Each course is one Nx project, grouped by track.

| Track | Courses |
| ----- | ------- |
| HackerRank | [CPP](HackerRank/CPP) · [Java](HackerRank/Java) · [Python](HackerRank/Python) |
| Mosh | [Ultimate-Angular](Mosh/Ultimate-Angular) · [Ultimate-TypeScript](Mosh/Ultimate-TypeScript) |
| SoftUni-CPP | [CPP-Advanced](SoftUni-CPP/CPP-Advanced) · [CPP-OOP](SoftUni-CPP/CPP-OOP) · [Programming-Basics](SoftUni-CPP/Programming-Basics) · [Programming-Fundamentals](SoftUni-CPP/Programming-Fundamentals) |
| SoftUni-CS | [ASP-Net-Core](SoftUni-CS/ASP-Net-Core) · [CS-Advanced](SoftUni-CS/CS-Advanced) · [CS-OOP](SoftUni-CS/CS-OOP) · [CS-Web-Basics](SoftUni-CS/CS-Web-Basics) · [Data-Structures-Advanced](SoftUni-CS/Data-Structures-Advanced) · [Data-Structures-Fundamentals](SoftUni-CS/Data-Structures-Fundamentals) · [Entity-Framework-Core](SoftUni-CS/Entity-Framework-Core) · [MsSQL](SoftUni-CS/MsSQL) · [Programming-Basics](SoftUni-CS/Programming-Basics) · [Programming-Fundamentals](SoftUni-CS/Programming-Fundamentals) |
| SoftUni-JS | [Angular](SoftUni-JS/Angular) · [HTML-and-CSS](SoftUni-JS/HTML-and-CSS) · [JS-Advanced](SoftUni-JS/JS-Advanced) · [JS-Applications](SoftUni-JS/JS-Applications) · [JS-Back-End](SoftUni-JS/JS-Back-End) · [Programming-Basics](SoftUni-JS/Programming-Basics) · [Programming-Fundamentals](SoftUni-JS/Programming-Fundamentals) · [React-Final-Project](SoftUni-JS/React-Final-Project) · [ReactJS](SoftUni-JS/ReactJS) |
| SoftUni-Java | [Algorithms-Advanced](SoftUni-Java/Algorithms-Advanced) · [Algorithms-Fundamentals](SoftUni-Java/Algorithms-Fundamentals) · [Data-Structures-Advanced](SoftUni-Java/Data-Structures-Advanced) · [Data-Structures-Fundamentals](SoftUni-Java/Data-Structures-Fundamentals) · [Java-Advanced](SoftUni-Java/Java-Advanced) · [Java-OOP](SoftUni-Java/Java-OOP) · [MySQL](SoftUni-Java/MySQL) · [Programming-Basics](SoftUni-Java/Programming-Basics) · [Programming-Fundamentals](SoftUni-Java/Programming-Fundamentals) · [Spring-Advanced-Final-Project](SoftUni-Java/Spring-Advanced-Final-Project) · [Spring-Advanced](SoftUni-Java/Spring-Advanced) · [Spring-Data](SoftUni-Java/Spring-Data) · [Spring-Fundamentals](SoftUni-Java/Spring-Fundamentals) |
| SoftUni-PHP | [PHP-Fundamentals](SoftUni-PHP/PHP-Fundamentals) · [PHP-Web-Development-Basics](SoftUni-PHP/PHP-Web-Development-Basics) |
| SoftUni-Python | [Programming-Basics](SoftUni-Python/Programming-Basics) · [Programming-Fundamentals](SoftUni-Python/Programming-Fundamentals) · [Python-Advanced](SoftUni-Python/Python-Advanced) · [Python-OOP](SoftUni-Python/Python-OOP) · [Python-Web-Basics](SoftUni-Python/Python-Web-Basics) · [Python-Web-Framework](SoftUni-Python/Python-Web-Framework) |
| SoftUni-QA | [Back-End-Technologies-Basics](SoftUni-QA/Back-End-Technologies-Basics) · [Front-End-Technologies-Basics](SoftUni-QA/Front-End-Technologies-Basics) · [Front-End-Test-Automation](SoftUni-QA/Front-End-Test-Automation) · [Programming-Advanced-for-QA](SoftUni-QA/Programming-Advanced-for-QA) · [Programming-Fundamentals-and-Unit-Testing](SoftUni-QA/Programming-Fundamentals-and-Unit-Testing) |
| Stypress | [Stypress-Python](Stypress/Stypress-Python) |
| TU-Varna | [PHP](TU-Varna/PHP) |

## Layout

`<Track>/<Course>/` holds a course exactly as it was in its own repository, history included
(`git log --follow -- SoftUni-Java/Java-OOP/README.md` follows it across renames). Each course has a `project.json` named `<track>-<course>` in lowercase (e.g. `java-programming-basics`) with:

- `test`: build and run every lesson's tests (`tools/ci.sh build <stack>`)
- `format`: the course's formatter in check mode (`tools/ci.sh format <tool>`)
- tags: `track:<Track>` and `stack:<java|node|python|dotnet|cpp|php>`

## Use

Needs Node.js 24, plus the toolchain of the courses you run (JDK 25, .NET 10, Python 3.14, PHP 8.5, CMake).

```bash
npm install
npx nx graph                                  # browse the courses
npx nx run java-oop:test                      # one course
npx nx affected -t format test                # only courses changed since main
npx nx run-many -t test --projects=tag:track:SoftUni-Python
```

Results are cached: an unchanged course is not rebuilt.

## CI

`.github/workflows/ci.yml` asks Nx which courses a push or pull request touched and runs one job per course
with just the toolchains it needs. The `result` job gives rulesets a single check to require.
