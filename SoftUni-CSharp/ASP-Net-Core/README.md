# SoftUni ASP.NET Core

Solutions for the SoftUni ASP.NET Core course: MVC and Razor, filters and middleware, model binding and validation,
Web API, Identity and JWT, testing, layered architecture, caching, SignalR, deployment and Blazor. Every lecture folder
is its own solution (`NNN-Lecture/NNN-Lecture.slnx`) with tests.

## Lectures

| #   | Lecture | Exercises |
| --- | ------- | --------- |
| 001 | ASP.NET Core Introduction | [Intro](001-Asp.Net-Core-Introduction/Intro): MVC controllers and views for products |
| 002 | Razor Views | [Razor Views](002-Razor-Views/RazorViews): books with layouts, partials and a view component |
| 003 | Application Flow, Filters and Middleware | [App Flow](003-Application-Flow-Filters-And-Middleware/AppFlow): custom middleware (request id), action / result filters, feature flags |
| 004 | Working with Data | [Working with Data](004-Working-With-Data/WorkingWithData): model binding, custom binder, validation attributes, file upload |
| 006 | Web API | [Web API](006-Web-Api/WebApi): products REST API on EF Core |
| 007 | Security and Identity | [Security](007-Security-And-Identity/Security): ASP.NET Core Identity, JWT bearer tokens, authorized endpoints |
| 009 | Testing | [Todos](009-Testing/Todos): unit and integration tests for a todo app |
| 010 | Project Architecture | Library: [data](010-Project-Architecture/Library.Data) · [services](010-Project-Architecture/Library.Services) · [web](010-Project-Architecture/Library.Web) – repository pattern, layered solution |
| 011 | Advanced Topics | [Advanced](011-Advanced-Topics/Advanced): memory caching, response caching and compression |
| 013 | SignalR | [Chat](013-Signalr/Chat): real-time chat hub |
| 014 | Azure Deployment and CI | [Deployable](014-Azure-Deployment-And-Ci/Deployable): Dockerfile + [Azure Pipelines](014-Azure-Deployment-And-Ci/azure-pipelines.yml) |
| 015 | Blazor | [Blazor App](015-Blazor/BlazorApp): weather components |

## Run

Needs the .NET 10 SDK.

```bash
dotnet test 009-Testing/009-Testing.slnx
dotnet run --project 013-Signalr/Chat
```

## License

[MIT](LICENSE)
