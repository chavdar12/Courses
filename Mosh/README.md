# Mosh (Ultimate Courses)

2 courses · TypeScript · part of [Courses](../README.md), one Nx workspace for all of them.

Each course folder has its own README with every lecture and exercise.

| Course | What it covers | Stack | Nx project |
| ------ | -------------- | ----- | ---------- |
| [Ultimate Angular](Ultimate-Angular) | Package scaffolds of Ultimate Courses' Angular libraries (lite-store, ngx-fullscreen, ngx-pagevisibility); the library code is not included. | TypeScript | `mosh-ultimate-angular` |
| [Ultimate TypeScript](Ultimate-TypeScript) | Package scaffold of Ultimate Courses' `@ultimate/vault` storage utility; the implementation is not included. | TypeScript | `mosh-ultimate-typescript` |

## Run

From the repository root:

```bash
npx nx run-many -t format test --projects 'tag:track:Mosh'   # every course in this track
npx nx run <nx-project>:test                                        # one course (Nx project column)
```
