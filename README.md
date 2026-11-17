# Courses

Every course solution in one [Nx](https://nx.dev) workspace. Each course is one Nx project, grouped by track.

| Track | Courses |
| ----- | ------- |
| HackerRank | [hackerrank-cpp](HackerRank/hackerrank-cpp) · [hackerrank-java](HackerRank/hackerrank-java) · [hackerrank-python](HackerRank/hackerrank-python) |
| Mosh | [Mosh-Ultimate-Angular](Mosh/Mosh-Ultimate-Angular) · [Mosh-Ultimate-Typescript](Mosh/Mosh-Ultimate-Typescript) |
| SoftUni-CPP | [CPP-Advanced](SoftUni-CPP/CPP-Advanced) · [CPP-OOP](SoftUni-CPP/CPP-OOP) · [Programming-Basics-with-CPP](SoftUni-CPP/Programming-Basics-with-CPP) · [Programming-Fundamentals-with-CPP](SoftUni-CPP/Programming-Fundamentals-with-CPP) |
| SoftUni-CS | [ASP-Net-Core](SoftUni-CS/ASP-Net-Core) · [CS-Advanced](SoftUni-CS/CS-Advanced) · [CS-OOP](SoftUni-CS/CS-OOP) · [CS-Web-Basics](SoftUni-CS/CS-Web-Basics) · [Data-Structures-Advanced-with-CS](SoftUni-CS/Data-Structures-Advanced-with-CS) · [Data-Structures-Fundamentals-with-CS](SoftUni-CS/Data-Structures-Fundamentals-with-CS) · [Entity-Framework-Core](SoftUni-CS/Entity-Framework-Core) · [MsSQL](SoftUni-CS/MsSQL) · [Programming-Basics-with-CS](SoftUni-CS/Programming-Basics-with-CS) · [Programming-Fundamentals-with-CS](SoftUni-CS/Programming-Fundamentals-with-CS) |
| SoftUni-Java | [Algorithms-Advanced-with-Java](SoftUni-Java/Algorithms-Advanced-with-Java) · [Algorithms-Fundamentals-with-Java](SoftUni-Java/Algorithms-Fundamentals-with-Java) · [Data-Structures-Advanced-with-Java](SoftUni-Java/Data-Structures-Advanced-with-Java) · [Data-Structures-Fundamentals-with-Java](SoftUni-Java/Data-Structures-Fundamentals-with-Java) · [Java-Advanced](SoftUni-Java/Java-Advanced) · [Java-OOP](SoftUni-Java/Java-OOP) · [MySQL](SoftUni-Java/MySQL) · [Programming-Basics-with-Java](SoftUni-Java/Programming-Basics-with-Java) · [Programming-Fundamentals-with-Java](SoftUni-Java/Programming-Fundamentals-with-Java) · [Spring-Advanced-Final-Project](SoftUni-Java/Spring-Advanced-Final-Project) · [Spring-Advanced](SoftUni-Java/Spring-Advanced) · [Spring-Data](SoftUni-Java/Spring-Data) · [Spring-Fundamentals](SoftUni-Java/Spring-Fundamentals) |
| SoftUni-JS | [JS-Advanced](SoftUni-JS/JS-Advanced) · [JS-Applications](SoftUni-JS/JS-Applications) · [JS-Back-End](SoftUni-JS/JS-Back-End) · [Programming-Basics-With-Javascript](SoftUni-JS/Programming-Basics-With-Javascript) · [Programming-Fundamentals-With-Javascript](SoftUni-JS/Programming-Fundamentals-With-Javascript) · [SoftUni-Angular](SoftUni-JS/SoftUni-Angular) · [SoftUni-HTML-and-CSS](SoftUni-JS/SoftUni-HTML-and-CSS) · [SoftUni-React-Final-Project](SoftUni-JS/SoftUni-React-Final-Project) · [SoftUni-ReactJS](SoftUni-JS/SoftUni-ReactJS) |
| SoftUni-PHP | [PHP-Fundamentals](SoftUni-PHP/PHP-Fundamentals) · [PHP-Web-Development-Basics](SoftUni-PHP/PHP-Web-Development-Basics) |
| SoftUni-Python | [Programming-Basics-with-Python](SoftUni-Python/Programming-Basics-with-Python) · [Programming-Fundamentals-with-Python](SoftUni-Python/Programming-Fundamentals-with-Python) · [Python-Advanced](SoftUni-Python/Python-Advanced) · [Python-OOP](SoftUni-Python/Python-OOP) · [Python-Web-Basics](SoftUni-Python/Python-Web-Basics) · [Python-Web-Framework](SoftUni-Python/Python-Web-Framework) |
| SoftUni-QA | [SoftUni-Back-End-Technologies-Basics](SoftUni-QA/SoftUni-Back-End-Technologies-Basics) · [SoftUni-Front-End-Technologies-Basics](SoftUni-QA/SoftUni-Front-End-Technologies-Basics) · [SoftUni-Front-End-Test-Automation](SoftUni-QA/SoftUni-Front-End-Test-Automation) · [SoftUni-Programming-Advanced-for-QA](SoftUni-QA/SoftUni-Programming-Advanced-for-QA) · [SoftUni-Programming-Fundamentals-and-Unit-Testing](SoftUni-QA/SoftUni-Programming-Fundamentals-and-Unit-Testing) |
| Stypress | [Stypress-Python](Stypress/Stypress-Python) |
| TU-Varna | [TU-Varna-PHP](TU-Varna/TU-Varna-PHP) |

## Layout

`<Track>/<Course>/` holds a course exactly as it was in its own repository, history included
(`git log -- SoftUni-Java/Java-OOP` shows it). Each course has a `project.json` with:

- `test`: build and run every lesson's tests (`tools/ci.sh build <stack>`)
- `format`: the course's formatter in check mode (`tools/ci.sh format <tool>`)
- tags: `track:<Track>` and `stack:<java|node|python|dotnet|cpp|php>`

## Use

Needs Node.js 24, plus the toolchain of the courses you run (JDK 25, .NET 10, Python 3.14, PHP 8.5, CMake).

```bash
npm install
npx nx graph                                  # browse the courses
npx nx run Java-OOP:test                      # one course
npx nx affected -t format test                # only courses changed since main
npx nx run-many -t test --projects=tag:track:SoftUni-Python
```

Results are cached: an unchanged course is not rebuilt.

## CI

`.github/workflows/ci.yml` asks Nx which courses a push or pull request touched and runs one job per course
with just the toolchains it needs. The `result` job gives rulesets a single check to require.
