# Laravel & PHP Mastery

My solutions for the Udemy course "Laravel & PHP Mastery: Build 5 Real-World Projects". Each of the five projects is a
self-contained Laravel 13 app on PHP 8.5, rewritten from scratch, with feature tests that run against an in-memory SQLite
database.

| #   | Project                                     | Covers                                                                                                     |
| --- | ------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| 001 | [Task List](001-Task-List)                  | resource controller, form request validation, Blade layouts, pagination, toggle complete                   |
| 002 | [Book Review](002-Book-Review)              | relationships, `withCount` / `withAvg`, popular and highest-rated scopes, caching, rate-limited reviews    |
| 003 | [Event Management](003-Event-Management)    | REST API, Sanctum tokens, policies, API resources with `?include=`, rate limiting, scheduled reminders      |
| 004 | [Livewire Poll](004-Livewire-Poll)          | Livewire 4 components, validation, events between components                                               |
| 005 | [Job Board](005-Job-Board)                  | session auth, employers, job filters, soft deletes, policies, job applications with private CV uploads      |

## Run a project

```bash
cd 002-Book-Review
composer setup             # install, .env, app key, SQLite database, migrate + seed
php artisan serve          # http://localhost:8000
php artisan test
```

Seeded logins use the password `password`:

| Project          | Accounts                                                  |
| ---------------- | --------------------------------------------------------- |
| Event Management | `test@example.com` (`POST /api/login` returns a token)    |
| Job Board        | `seeker@example.com`, `employer@example.com`              |

### Event Management API

| Method | Path                                      | Auth  |
| ------ | ----------------------------------------- | ----- |
| POST   | `/api/login`, `/api/logout`               | – / ✓ |
| GET    | `/api/events?include=user,attendees.user` | –     |
| GET    | `/api/events/{event}`                     | –     |
| POST   | `/api/events`                             | ✓     |
| PUT    | `/api/events/{event}`                     | owner |
| DELETE | `/api/events/{event}`                     | owner |
| GET    | `/api/events/{event}/attendees`           | –     |
| POST   | `/api/events/{event}/attendees`           | ✓     |
| DELETE | `/api/events/{event}/attendees/{id}`      | attendee or event owner |

`php artisan app:send-event-reminders` emails attendees of events starting within a day; the scheduler runs it daily.

## License

[MIT](LICENSE)
