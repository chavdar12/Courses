# Angular – The Complete Guide

My solutions for Maximilian Schwarzmüller's Udemy course "Angular – The Complete Guide", written from scratch: one
self-contained Angular 22 app per section (standalone components, signals, built-in control flow, Vitest via `ng test`).
Section 03 uses NgModules on purpose, and section 16 adds server-side rendering.

| #   | Section                 | Project                                                                   | Covers                                                                                   |
| --- | ----------------------- | ------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| 002 | Essentials              | [Task-Manager](002-Essentials/Task-Manager)                               | components, `input` / `output`, signals, `@for` / `@if`, services, localStorage          |
| 003 | Essentials: Modules     | [Team-Board](003-Essentials-Modules/Team-Board)                           | `NgModule` declarations, a shared module, `bootstrapModule`                              |
| 004 | Practice Project        | [Investment-Calculator](004-Essentials-Practice/Investment-Calculator)    | form input, a calculation service, `CurrencyPipe`                                        |
| 005 | Debugging               | [Shopping-Cart](005-Debugging/Shopping-Cart)                              | a custom `ErrorHandler`, regression tests for the bugs that were fixed                   |
| 006 | Components Deep Dive    | [Admin-Dashboard](006-Components-Deep-Dive/Admin-Dashboard)               | content projection, attribute selectors, host bindings, `viewChild`, `contentChild`, `model()`, `DestroyRef` |
| 007 | Directives Deep Dive    | [Learning-Resources](007-Directives-Deep-Dive/Learning-Resources)         | attribute and structural directives, host directives                                     |
| 008 | Pipes Deep Dive         | [Weather-Log](008-Pipes-Deep-Dive/Weather-Log)                            | built-in pipes, custom temperature and sort pipes, pure pipes                            |
| 009 | Services Deep Dive      | [Task-Board](009-Services-Deep-Dive/Task-Board)                           | services injected into services, element providers, `InjectionToken`                     |
| 010 | Change Detection        | [Message-Board](010-Change-Detection/Message-Board)                        | `OnPush`, signals, `BehaviorSubject` + `async` pipe, zoneless                            |
| 011 | RxJS                    | [Rx-Playground](011-RxJS/Rx-Playground)                                   | `interval`, operators, a custom `Observable`, `toSignal` / `toObservable`                |
| 012 | HTTP                    | [Favorite-Places](012-HTTP/Favorite-Places)                               | `HttpClient`, loading / error states, optimistic updates, a global error service, interceptors |
| 013 | Forms                   | [Auth-Forms](013-Forms/Auth-Forms)                                        | template-driven login, reactive signup with groups, arrays and custom validators         |
| 014 | Routing                 | [Team-Tasks](014-Routing/Team-Tasks)                                      | params as inputs, child routes, query params, resolvers, titles, `canMatch` / `canDeactivate` |
| 015 | Lazy Loading            | [Lazy-Shop](015-Lazy-Loading/Lazy-Shop)                                   | `loadComponent`, `loadChildren`, route providers, `@defer`                               |
| 016 | Deployment              | [Notes-SSR](016-Deployment/Notes-SSR)                                     | SSR with Express, prerendering, hydration, browser-only storage                          |

## Run an app

```bash
cd 014-Routing/Team-Tasks
npm install
npm start                  # http://localhost:4200
npm test -- --watch=false
npm run build
```

## Favorite Places API

`012-HTTP/Favorite-Places` proxies `/api` to a small in-memory API (`server/server.ts`, Node 24 runs it directly). Data
resets on restart.

```bash
cd 012-HTTP/Favorite-Places
npm run server             # http://localhost:3000/api
npm start                  # in a second terminal
```

| Method | Path                    | Body                  |
| ------ | ----------------------- | --------------------- |
| GET    | `/api/places`           |                       |
| GET    | `/api/user-places`      |                       |
| PUT    | `/api/user-places`      | `{ "placeId": "p1" }` |
| DELETE | `/api/user-places/:id`  |                       |

## Server-side rendering

```bash
cd 016-Deployment/Notes-SSR
npm run build              # prerenders / and /about
npm run serve:ssr          # http://localhost:4000
```

## Certificate

[Udemy · Angular – The Complete Guide](Resources/Certificate.pdf)

## License

[MIT](LICENSE)
