# SoftUni Angular

Solutions to the [SoftUni](https://softuni.bg) **Angular** course, rewritten for **Angular 22**: standalone
components, signals, `@if` / `@for` control flow, functional guards, resolvers and interceptors, `httpResource`
and lazy loaded routes.

Every project folder is a **self-contained Angular project** with its own `package.json`, `angular.json` and `node_modules`.

## Lessons

| #   | Lesson | Project |
| --- | ------ | ------- |
| 001 | Intro to Angular and TypeScript | [TypeScript Playground](001-Intro-To-Angular-And-Typescript) (6 exercises) |
| 002 | Components | [Articles App](002-Components/Articles-App) - components lab |
| 003 | DI, Intro to RxJS, Services | [Posts App](003-Di-Intro-To-Rxjs-Services/Posts-App) |
| 004 | Workshop - Components | [Forum, Part 1](004-Workshop-Components/Forum) |
| 005 | Modules and Routing | [Routing App](005-Modules-And-Routing/Routing-App) |
| 006 | Workshop - Modules and Routing | [Forum, Part 2](006-Workshop-Modules-And-Routing/Forum) |
| 007 | Directives and Forms | [Register Form App](007-Forms/Register-Form-App) - forms lab |
| 008 | Workshop - Forms | [Forum, Part 3](008-Workshop-Forms/Forum) |
| 009 | Pipes, Interceptors and Subjects | [Pipes, Interceptors and Subjects](009-Pipes-Interceptors-And-Subjects/Pipes-Interceptors-App) |
| 010 | Workshop - Pipes, Interceptors, Subjects | [Forum, Part 4](010-Workshop-Pipes-Interceptors-And-Subjects/Forum) |
| 011 | State Management | [Counter App](011-State-Management/Counter-App) - NgRx Store |

## Getting started

Requires Node.js 22+ (and Docker for the forum's database). Run everything from the project's own folder:

```bash
cd 002-Components/Articles-App
npm install
npm start

# TypeScript exercises (Node runs .ts files directly)
cd 001-Intro-To-Angular-And-Typescript
node 002-Tickets/index.ts
npm install && npm run check   # type-check all of them
```

## Forum workshop (004, 006, 008, 010)

Each workshop part is a separate snapshot of the same app, so every step can be studied on its own:

| Part | What it adds                                                                                                                        |
| ---- | ----------------------------------------------------------------------------------------------------------------------------------- |
| 1    | Skeleton split into components, themes sorted by subscribers, 5 recent posts (HttpClient)                                           |
| 2    | Routing, fake authentication (in memory), auth / guest guards, `/logout` route, theme details, 404 page                             |
| 3    | Reactive login / register, template-driven new theme / profile edit, custom gmail validator and `input-error` directives            |
| 4    | Real JWT (cookie) authentication, auth + error interceptors, notifications, lazy loading, `shorten` / `forumDate` / `timeAgo` pipes |

Each workshop folder has its own copy of the backend. Start it first:

```bash
cd 010-Workshop-Pipes-Interceptors-And-Subjects/rest-api
npm install
docker compose up -d   # MongoDB on localhost:27017
npm start              # API on http://localhost:3000/api, seeds the initial data on first run
```

The forum apps proxy `/api` to `localhost:3000` (see each Forum's `proxy.conf.json`), so the auth cookie
works without CORS. Parts 2 and 3 use fake authentication - log in with `johny@gmail.com` / `12345`
(Part 2) or `johny.doe@gmail.com` / `12345` (Part 3). Part 4 uses real accounts - register a new one.
