# SoftUni JS Applications

Solutions for the SoftUni JS Applications course: REST services, async programming, remote data and authentication,
single page applications, architecture and testing, client-side rendering with lit-html, routing, modular apps and two
exam-prep SPAs. Every lecture ships the SoftUni practice server in `server/` and `node --test` tests for its apps.

## Lectures

| #   | Lecture | Exercises |
| --- | ------- | --------- |
| 001 | HTTP and REST Services | [REST Services](001-Http-And-Rest-Services/01.REST-Services) |
| 002 | Exercise: HTTP and REST Services | [REST Services](002-Exercise-Http-And-Rest-Services/01.REST-Services) |
| 003 | Asynchronous Programming | [XHR](003-Asynchronous-Programming/01.XHR) · [GitHub Repos](003-Asynchronous-Programming/02.Github-Repos) · [GitHub Commits](003-Asynchronous-Programming/03.Gighub-Commits) · [Cookbook](003-Asynchronous-Programming/04.Cookbook) |
| 004 | Exercise: Asynchronous Programming | [Bus Stop](004-Exercise-Asynchronous-Programming/01.Bus-Stop) · [Bus Schedule](004-Exercise-Asynchronous-Programming/02.Bus-Schedule) · [Forecaster](004-Exercise-Asynchronous-Programming/03.Forecaster) · [Locked Profile](004-Exercise-Asynchronous-Programming/04.Locked-Profile) · [Accordion](004-Exercise-Asynchronous-Programming/05.%20Accordion) · [Blog](004-Exercise-Asynchronous-Programming/06.Blog) |
| 005 | Remote Data and Authentication | [Cookbook](005-Remote-Data-And-Authentication/base) |
| 006 | Exercise: Remote Data and Authentication | [Messenger](006-Exercise-Remote-Data-And-Authentication/01.Messenger) · [Phonebook](006-Exercise-Remote-Data-And-Authentication/02.Phonebook) · [Students](006-Exercise-Remote-Data-And-Authentication/03.Students) · [Book Library](006-Exercise-Remote-Data-And-Authentication/04.Book-library) · [Fisher Game](006-Exercise-Remote-Data-And-Authentication/05.Fisher-Game) · [Furniture](006-Exercise-Remote-Data-And-Authentication/06.Furniture) |
| 007 | Single Page Applications | [Calendar](007-Single-Page-Applications/01.Calendar) · [Cooking Book](007-Single-Page-Applications/02.%20Cooking%20book) |
| 008 | Exercise: Single Page Applications | [Forum](008-Exercise-Single-Page-Applications/01.Forum) · [Movies](008-Exercise-Single-Page-Applications/02.Movies) |
| 009 | Architecture and Testing | [Accordion](009-Architecture-And-Testing/01.%20Accordion) · [Cookbook](009-Architecture-And-Testing/02.Cookbook) |
| 010 | Exercise: Architecture and Testing | [Messenger](010-Exercise-Architecture-And-Testing/01.Messenger) · [Book Library](010-Exercise-Architecture-And-Testing/02.Book-Library) · [Soft Terest](010-Exercise-Architecture-And-Testing/03.SoftTerest) |
| 011 | Client Side Rendering | [Contacts](011-Client-Side-Rendering/01.Contacts) · [Cookbook](011-Client-Side-Rendering/02.Cookbook) |
| 012 | Exercise: Client Side Rendering | [List Towns](012-Exercise-Client-Side-Rendering/01.List-Towns) · [HTTP Status Cats](012-Exercise-Client-Side-Rendering/02.HTTP-Status-Cats) · [Search in List](012-Exercise-Client-Side-Rendering/03.Search-in-List) · [Fill Dropdown](012-Exercise-Client-Side-Rendering/04.Fill-Dropdown) · [Table Search](012-Exercise-Client-Side-Rendering/05.Table-Search) · [Book Library](012-Exercise-Client-Side-Rendering/06.Book-Library) |
| 013 | Routing | [Cookbook](013-Routing/01.Cookbook) |
| 014 | Exercise: Routing | [Furniture](014-Exercise-Routing/01.Furniture) |
| 015 | Modular Applications | [Cookbook](015-Modular-Applications/01.Cookbook) |
| 016 | Exercise: Modular Applications | [Team Manager](016-Exercise-Modular-Applications/01.Team-Manager) |
| 017 | Exam Preparation: CarTube | [Cartube](017-Exam-Preparation-Cartube/01.Cartube) |
| 018 | Exam Preparation: GamesPlay | [Gamesplay](018-Exam-Preparation-Gamesplay/01.Gamesplay) |

## Run

Needs Node.js 24.

```bash
cd 016-Exercise-Modular-Applications
npm install
npm run server     # practice REST server – http://localhost:3030
npm test
```

Open an app's `index.html` through any static server (e.g. `npx http-server`) while the practice server is running.

## License

[MIT](LICENSE)

## Course materials

Slides and task sheets from the course, stored next to each lesson.

Course overview: [Javascript-Application.pdf](Javascript-Application.pdf)

| Lesson | Materials |
| ------ | --------- |
| [001-Http-And-Rest-Services](001-Http-And-Rest-Services) | [Js-Applications-Http-And-Rest-Services-Lab.pdf](001-Http-And-Rest-Services/Resources/Js-Applications-Http-And-Rest-Services-Lab.pdf) · [Js-Applications-Http-And-Rest-Services.pdf](001-Http-And-Rest-Services/Resources/Js-Applications-Http-And-Rest-Services.pdf) · [Js-Applications-Remote-Databases-Guide.pdf](001-Http-And-Rest-Services/Resources/Js-Applications-Remote-Databases-Guide.pdf) |
| [002-Exercise-Http-And-Rest-Services](002-Exercise-Http-And-Rest-Services) | [Js-Applications-Http-And-Rest-Services-Exercise.pdf](002-Exercise-Http-And-Rest-Services/Resources/Js-Applications-Http-And-Rest-Services-Exercise.pdf) |
| [003-Asynchronous-Programming](003-Asynchronous-Programming) | [Js-Applications-Asynchronous-Programming-Lab.pdf](003-Asynchronous-Programming/Resources/Js-Applications-Asynchronous-Programming-Lab.pdf) · [Js-Applications-Asynchronous-Programming.pdf](003-Asynchronous-Programming/Resources/Js-Applications-Asynchronous-Programming.pdf) |
| [004-Exercise-Asynchronous-Programming](004-Exercise-Asynchronous-Programming) | [Js-Applications-Asynchronous-Programming-Exercise.pdf](004-Exercise-Asynchronous-Programming/Resources/Js-Applications-Asynchronous-Programming-Exercise.pdf) |
| [005-Remote-Data-And-Authentication](005-Remote-Data-And-Authentication) | [Js-Applications-Data-And-Authentication-Lab.pdf](005-Remote-Data-And-Authentication/Resources/Js-Applications-Data-And-Authentication-Lab.pdf) · [Js-Applications-Data-And-Authentication.pdf](005-Remote-Data-And-Authentication/Resources/Js-Applications-Data-And-Authentication.pdf) |
| [006-Exercise-Remote-Data-And-Authentication](006-Exercise-Remote-Data-And-Authentication) | [Js-Applications-Data-And-Authentication-Exercise.pdf](006-Exercise-Remote-Data-And-Authentication/Resources/Js-Applications-Data-And-Authentication-Exercise.pdf) |
| [007-Single-Page-Applications](007-Single-Page-Applications) | [Js-Applications-Single-Page-Applications-Lab.pdf](007-Single-Page-Applications/Resources/Js-Applications-Single-Page-Applications-Lab.pdf) · [Js-Applications-Single-Page-Applications.pdf](007-Single-Page-Applications/Resources/Js-Applications-Single-Page-Applications.pdf) |
| [008-Exercise-Single-Page-Applications](008-Exercise-Single-Page-Applications) | [Js-Applications-Single-Page-Applications-Exercise.pdf](008-Exercise-Single-Page-Applications/Resources/Js-Applications-Single-Page-Applications-Exercise.pdf) |
| [009-Architecture-And-Testing](009-Architecture-And-Testing) | [Js-Applications-Architecture-And-Testing-Lab.pdf](009-Architecture-And-Testing/Resources/Js-Applications-Architecture-And-Testing-Lab.pdf) · [Js-Applications-Architecture-And-Testing.pdf](009-Architecture-And-Testing/Resources/Js-Applications-Architecture-And-Testing.pdf) · [Playwright-Guide.pdf](009-Architecture-And-Testing/Resources/Playwright-Guide.pdf) |
| [010-Exercise-Architecture-And-Testing](010-Exercise-Architecture-And-Testing) | [Js-Applications-Architecture-And-Testing-Exercise.pdf](010-Exercise-Architecture-And-Testing/Resources/Js-Applications-Architecture-And-Testing-Exercise.pdf) |
| [011-Client-Side-Rendering](011-Client-Side-Rendering) | [Js-Applications-Client-Side-Rendering-Lab.pdf](011-Client-Side-Rendering/Resources/Js-Applications-Client-Side-Rendering-Lab.pdf) · [Js-Applications-Client-Side-Rendering.pdf](011-Client-Side-Rendering/Resources/Js-Applications-Client-Side-Rendering.pdf) |
| [012-Exercise-Client-Side-Rendering](012-Exercise-Client-Side-Rendering) | [Js-Applications-Client-Side-Rendering-Exercise.pdf](012-Exercise-Client-Side-Rendering/Resources/Js-Applications-Client-Side-Rendering-Exercise.pdf) |
| [013-Routing](013-Routing) | [Js-Applications-Routing-Lab.pdf](013-Routing/Resources/Js-Applications-Routing-Lab.pdf) · [Js-Applications-Routing.pdf](013-Routing/Resources/Js-Applications-Routing.pdf) |
| [014-Exercise-Routing](014-Exercise-Routing) | [Js-Applications-Routing-Execise.pdf](014-Exercise-Routing/Resources/Js-Applications-Routing-Execise.pdf) |
| [015-Modular-Applications](015-Modular-Applications) | [Js-Applications-Modular-Applications-Lab.pdf](015-Modular-Applications/Resources/Js-Applications-Modular-Applications-Lab.pdf) · [Js-Applications-Modular-Applications.pdf](015-Modular-Applications/Resources/Js-Applications-Modular-Applications.pdf) |
| [016-Exercise-Modular-Applications](016-Exercise-Modular-Applications) | [Js-Applications-Modular-Applications-Exercise.pdf](016-Exercise-Modular-Applications/Resources/Js-Applications-Modular-Applications-Exercise.pdf) |
| [017-Exam-Preparation-Cartube](017-Exam-Preparation-Cartube) | [Cartube-.pdf](017-Exam-Preparation-Cartube/Resources/Cartube-.pdf) |
| [018-Exam-Preparation-Gamesplay](018-Exam-Preparation-Gamesplay) | [Gamesplay.pdf](018-Exam-Preparation-Gamesplay/Resources/Gamesplay.pdf) |
