# Ultimate Angular

Package scaffolds of three open-source Angular libraries by [Ultimate Courses](https://ultimatecourses.com):

| Folder | Package | Upstream |
| ------ | ------- | -------- |
| [lite-store](lite-store) | `@ultimate/lite-store`: reactive stores with entities and frozen state | [ultimatecourses/lite-store](https://github.com/ultimatecourses/lite-store) |
| [ngx-fullscreen](ngx-fullscreen) | `@ultimate/ngx-fullscreen`: a directive for the Fullscreen API | [ultimatecourses/ngx-fullscreen](https://github.com/ultimatecourses/ngx-fullscreen) |
| [ngx-pagevisibility](ngx-pagevisibility) | `@ultimate/ngx-pagevisibility`: a directive for the Page Visibility API | [ultimatecourses/ngx-pagevisibility](https://github.com/ultimatecourses/ngx-pagevisibility) |

Only the package setup is here (`package.json`, `ng-package.json`, tsconfigs, the `src/index.ts` barrel). The library
code under `src/lib/` was never added, so the packages do not build and there is nothing to test yet.
