# SoftUni Angular

Solutions for the SoftUni Angular course: one self-contained Angular 22 app per lecture (standalone components, signals,
Vitest via `ng test`), plus a TypeScript playground for the intro lecture. The three forum workshops build on each other
and ship their own Express + MongoDB REST API.

| #   | Lecture                                   | Project                                                                             | Covers                                                                            |
| --- | ----------------------------------------- | ----------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| 001 | Intro to Angular and TypeScript           | [TypeScript Playground](001-Intro-To-Angular-And-Typescript)                        | classes, interfaces, generics – 6 exercises with `node --test` tests              |
| 002 | Components                                | [Articles-App](002-Components/Articles-App)                                         | signal inputs, `computed`, data binding, `@for` / `@if`                       |
| 003 | DI, Intro to RxJS and Services            | [Posts-App](003-Di-Intro-To-Rxjs-Services/Posts-App)                                | services, dependency injection, `HttpClient`, observables and operators           |
| 004 | Workshop: Components                      | [Forum](004-Workshop-Components/Forum) + [rest-api](004-Workshop-Components/rest-api) | forum layout, header/footer, theme list, recent posts from the API              |
| 005 | Modules and Routing                       | [Routing-App](005-Modules-And-Routing/Routing-App)                                  | routes, params, lazy-loaded admin area, guards, resolvers, 404                    |
| 006 | Workshop: Modules and Routing             | [Forum](006-Workshop-Modules-And-Routing/Forum) + [rest-api](006-Workshop-Modules-And-Routing/rest-api) | login/register/profile, theme details, new theme, auth guard |
| 007 | Forms                                     | [Register-Form-App](007-Forms/Register-Form-App)                                    | template-driven vs reactive forms, validation, custom directive                   |
| 008 | Workshop: Forms                           | [Forum](008-Workshop-Forms/Forum) + [rest-api](008-Workshop-Forms/rest-api)         | forum forms with custom validators and validator directives                       |
| 009 | Pipes, Interceptors and Subjects          | [Pipes-Interceptors-App](009-Pipes-Interceptors-And-Subjects/Pipes-Interceptors-App) | built-in and custom pipes, HTTP interceptors, `Subject`, `BehaviorSubject`, `ReplaySubject`, `AsyncSubject`|
| 010 | Workshop: Pipes, Interceptors and Subjects | [Forum](010-Workshop-Pipes-Interceptors-And-Subjects/Forum) + [rest-api](010-Workshop-Pipes-Interceptors-And-Subjects/rest-api) | date / time-ago pipes, auth + error interceptors, notifications |
| 011 | State Management                          | [Counter-App](011-State-Management/Counter-App)                                     | NgRx store: actions, reducer, selectors                                           |

### 001 – TypeScript exercises

| #   | Exercise                                                                    |
| --- | --------------------------------------------------------------------------- |
| 001 | [Data Class](001-Intro-To-Angular-And-Typescript/001-Data-Class/index.ts)   |
| 002 | [Tickets](001-Intro-To-Angular-And-Typescript/002-Tickets/index.ts)         |
| 003 | [People](001-Intro-To-Angular-And-Typescript/003-People/index.ts)           |
| 004 | [The Elemelons](001-Intro-To-Angular-And-Typescript/004-The-Elemelons/index.ts) |
| 005 | [Boxes](001-Intro-To-Angular-And-Typescript/005-Boxes/index.ts)             |
| 006 | [Key Value Pairs](001-Intro-To-Angular-And-Typescript/006-Key-Value-Pairs/index.ts) |

```bash
cd 001-Intro-To-Angular-And-Typescript
npm install
node 002-Tickets/index.ts   # Node 22.18+ runs TypeScript directly
npm run check               # type-check
npm test
```

## Run an app

```bash
cd 005-Modules-And-Routing/Routing-App
npm install
npm start                  # http://localhost:4200
npm test -- --watch=false
npm run build
```

## Forum workshops

The forum apps proxy `/api` to `http://localhost:3000` (`proxy.conf.json`), so start the workshop's `rest-api` first:

```bash
cd 008-Workshop-Forms/rest-api
npm install
docker compose up -d       # MongoDB; or set DB_URL to your own
npm start                  # http://localhost:3000/api, seeded on first start
```

Then run `npm start` in the `Forum` folder next to it. See each `rest-api/README.md` for the endpoints.

## License

[MIT](LICENSE)
