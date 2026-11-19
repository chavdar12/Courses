# Udemy

7 courses · Java, Node.js, PHP · part of [Courses](../README.md), one Nx workspace for all of them.

Each course folder has its own README with every lecture and exercise.

| Course | What it covers | Stack | Nx project |
| ------ | -------------- | ----- | ---------- |
| [Angular – The Complete Guide](Angular-The-Complete-Guide) | One Angular 22 app per section: components, directives, pipes, services and DI, change detection, RxJS, HTTP, forms, routing, lazy loading and SSR. | Node.js | `udemy-angular-the-complete-guide` |
| [Java DSA Masterclass](Java-DSA-Masterclass) | Big O, recursion, hand-written lists, stacks, queues, trees (BST, AVL), heaps, tries and hash tables, sorting and searching, graphs and shortest paths, greedy, divide and conquer and dynamic programming, plus the interview questions. | Java | `udemy-java-dsa-masterclass` |
| [Laravel & PHP Mastery](Laravel-And-PHP-Mastery) | Five Laravel 13 apps: task list, book reviews, an event-management REST API with Sanctum, a Livewire poll and a job board, each with feature tests. | PHP | `udemy-laravel-and-php-mastery` |
| [Modern React with Redux](Modern-React-With-Redux) | Twelve React 19 + TypeScript apps from JSX and hooks to API search apps, Redux Toolkit and RTK Query, ending with a streams CRUD app and its own API. | Node.js | `udemy-modern-react-with-redux` |
| [PHP for Beginners – CMS Project](PHP-CMS-Project) | Beginner PHP exercises, then a blog CMS in plain PHP 8.5: posts, categories, search, moderated comments, accounts and an admin panel with roles, on PDO with CSRF protection. | PHP | `udemy-php-cms-project` |
| [Spring Microservices](Spring-Microservices) | A Spring Boot 4 REST API, then microservices with Spring Cloud: config server, Eureka, OpenFeign, Resilience4j, Gateway and Docker Compose. | Java | `udemy-spring-microservices` |
| [Svelte 5 and SvelteKit](Svelte-5-And-SvelteKit) | SvelteKit data loading, then three projects: an ebook landing page with Stripe, a Sanity-powered portfolio and a Supabase + OpenAI book tracker. | Node.js | `udemy-svelte-5-and-sveltekit` |

## Run

From the repository root:

```bash
npx nx run-many -t format test --projects 'tag:track:Udemy'   # every course in this track
npx nx run <nx-project>:test                                        # one course (Nx project column)
```
