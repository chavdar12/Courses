# SoftUni Back-End Technologies Basics

Solutions for the SoftUni Back-End Technologies Basics course (QA track). The C# lectures are .NET 10 projects with
NUnit tests, all in one solution ([SoftUni-Back-End-Technologies-Basics.slnx](SoftUni-Back-End-Technologies-Basics.slnx));
the JavaScript lectures are plain ES modules tested with Mocha + Chai from the repo root.

| #   | Lecture | Solution | Covers |
| --- | ------- | -------- | ------ |
| 002 | Back-End Technologies Overview | [notes](002-Back-End-Technologies-Overview) | theory only: client–server, HTTP, REST, databases |
| 003 | Data Formats: JSON, YAML and XML | [Data](003-Data-Formats-JSON-and-YAML-XML/Data) · [tests](003-Data-Formats-JSON-and-YAML-XML/DataFormats.Lab.Tests) | reading `products.json`, `countries.yaml`, `cities.xml` |
| 004 | Exercises: Data Formats | [DataFormats](004-Exercises-Data-Formats/DataFormats) · [tests](004-Exercises-Data-Formats/DataFormats.Tests) | JSON parser, XML → JSON, YAML → HTML |
| 005 | JavaScript Basics | [basics.js](005-JavaScript-Basics/basics.js) | Multiply by Two · Student Information · Excellent Grade · Month Printer · Math Operations · Largest Number · Theatre Promotions · Circle Area · Numbers 1 to 5 · Numbers from M to N |
| 006 | Exercise: JavaScript Basics | [exercises.js](006-Exercise-JavaScript-Basics/exercises.js) | Ages · Vacation · Leap Year · Print and Sum · Multiplication Table · Sum Digits · Chars to String · Reversed Chars · Fruit · Same Numbers · Road Radar · Cooking by Numbers |
| 007 | JavaScript Fundamentals | [fundamentals.js](007-JavaScript-Fundamentals/fundamentals.js) | Sum First and Last · Reverse Array · Even/Odd Subtraction · Substring · Censored Words · Count Occurrences · Format Grade · Math Power · Repeat String · Orders · Person Info · City · Phone Book |
| 008 | Exercise: JavaScript Fundamentals | [exercises.js](008-Exercise-JavaScript-Fundamentals/exercises.js) | Array Rotation · Every N-th Element · List of Names · Sorting Numbers · Reveal Words · String Substring · Smallest of Three · Add and Subtract · Odd and Even Sum · Password Validator · Employees · Towns · Store Provision · Movies · Inventory · Odd Occurrences · Piccolo |
| 009 | Unit Testing with JavaScript | [folder](009-Unit-Testing-with-JavaScript) | Sum · Check for Symmetry · RGB to Hex · Calculator |
| 010 | Exercises: Unit Testing with JavaScript | [folder](010-Exercises-Unit-Testing-with-JavaScript) | Even or Odd · Char Lookup · Math Enforcer · Array Analyzer |
| 011 | Databases Overview | [Sql](011-Databases-Overview/Sql) · [tests](011-Databases-Overview/Databases.Tests) | schema, seed and 6 SQL queries, run against SQLite |
| 012 | Integration Testing | [TownsApplication](012-Integration-Testing/TownsApplication) · [tests](012-Integration-Testing/TownsApplication.IntegrationTests) | EF Core app tested against SQLite |
| 013 | Exercises: Integration Testing, part 1 | [LibroConsoleAPI](013-Exercises-Integration-Testing-part-1/LibroConsoleAPI) · [tests](013-Exercises-Integration-Testing-part-1/LibroConsoleAPI.IntegrationTests) | book library CRUD |
| 014 | Exercise: Integration Testing, part 2 | [MoviesLibraryAPI](014-Exercise-Integration-Testing-part-2/MoviesLibraryAPI) · [tests](014-Exercise-Integration-Testing-part-2/MoviesLibraryAPI.IntegrationTests) | movies library CRUD |
| 015 | Unit Testing with Mocking | [GetGreeting](015-Unit-Testing-with-Mocking/GetGreeting) · [ItemManagement](015-Unit-Testing-with-Mocking/ItemManagement) | Moq: fake time provider, mocked repository |
| 016 | RESTful API Back-End Apps | [Homies](016-RESTful-API-Backend-Apps/Homies) · [tests](016-RESTful-API-Backend-Apps/Homies.Tests) | ASP.NET Core events API |
| 017 | Exercise: Testing API Controllers | [Homies.Api.Tests](017-Exercise-Testing-API-Controllers/Homies.Api.Tests) | `WebApplicationFactory` tests for the events controller |
| 018 | Code Coverage | [LibraryManagement](018-Code-Coverage/LibraryManagement) · [MyArrayExample](018-Code-Coverage/MyArrayExample) | coverlet, covering every branch |
| 019 | Mutation Testing | [ArrayTools](019-Mutation-Testing/ArrayTools) · [Calculator](019-Mutation-Testing/Calculator) | tests strong enough to kill mutants |
| 020 | Exam Preparation | [Cinema](020-Exam-Preparation/Cinema) · [ContactsConsoleAPI](020-Exam-Preparation/ContactsConsoleAPI) · [JsonParserMusicians](020-Exam-Preparation/JsonParserMusicians) | JS unit tests, integration tests, JSON parsing |
| 021 | Containers: Docker and Docker Compose | [NotesApi](021-Containers-Docker-and-Docker-Compose/NotesApi) · [compose.yaml](021-Containers-Docker-and-Docker-Compose/compose.yaml) | minimal API in a container, `/health` probe |
| 022 | Entity Framework Introduction | [PersonRegister](022-Entity-Framework-Introduction/PersonRegister) · [tests](022-Entity-Framework-Introduction/PersonRegister.Tests) | `DbContext`, CRUD with EF Core |
| 023 | ASP.NET Core Introduction | [MVCIntroDemo](023-ASP.NET-Core-Introduction/MVCIntroDemo) · [tests](023-ASP.NET-Core-Introduction/MVCIntroDemo.Tests) | MVC controllers, models, views |
| 024 | Exam Preparation | [Shop](024-Exam-Preparation/Shop) · [JsonParserAstronauts](024-Exam-Preparation/JsonParserAstronauts) | JS unit tests, JSON parsing |

## Run

```bash
# C# – needs the .NET 10 SDK
dotnet test SoftUni-Back-End-Technologies-Basics.slnx
dotnet test 012-Integration-Testing/TownsApplication.IntegrationTests   # a single project

# JavaScript – every *.test.js under the lecture folders
npm install
npm test
```

The Docker lecture's API can be run on its own:

```bash
docker build -f 021-Containers-Docker-and-Docker-Compose/NotesApi/Dockerfile -t notes-api .
docker run -p 8080:8080 notes-api        # curl http://localhost:8080/health
```

## License

[MIT](LICENSE)
