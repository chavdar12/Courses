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

## Course materials

Slides, task sheets and lecture videos for each lesson.

| Lesson | Materials | Video |
| ------ | --------- | ----- |
| [001-Asp.Net-Core-Introduction](001-Asp.Net-Core-Introduction) | [Csharp-Asp-Net-Core-Introduction-To-Asp.Net-Core.pdf](001-Asp.Net-Core-Introduction/Resources/Csharp-Asp-Net-Core-Introduction-To-Asp.Net-Core.pdf) | [Video](https://youtu.be/L77Y4rXspGI) |
| [002-Razor-Views](002-Razor-Views) | [Csharp-Asp-Net-Core-Razor-Views.pdf](002-Razor-Views/Resources/Csharp-Asp-Net-Core-Razor-Views.pdf) | [Video](https://youtu.be/GowHCMX7QAM) |
| [003-Application-Flow-Filters-And-Middleware](003-Application-Flow-Filters-And-Middleware) | [Csharp-Asp-Net-Core-Application-Flow-And-Middleware.pdf](003-Application-Flow-Filters-And-Middleware/Resources/Csharp-Asp-Net-Core-Application-Flow-And-Middleware.pdf) | [Video](https://youtu.be/MGImtEJKeHk) |
| [004-Working-With-Data](004-Working-With-Data) | [Csharp-Asp-Net-Core-Working-With-Data.pdf](004-Working-With-Data/Resources/Csharp-Asp-Net-Core-Working-With-Data.pdf) | [Video](https://youtu.be/jrqvRkOHqJA) |
| 005-Workshop | — | [Video](https://youtu.be/FC1netko7_I) |
| [006-Web-Api](006-Web-Api) | [Csharp-Asp-Net-Core-Web-Api.pdf](006-Web-Api/Resources/Csharp-Asp-Net-Core-Web-Api.pdf) | [Video](https://youtu.be/WOfpc3-VPbQ) |
| [007-Security-And-Identity](007-Security-And-Identity) | [Csharp-Asp-Net-Core-Security-And-Identity.pdf](007-Security-And-Identity/Resources/Csharp-Asp-Net-Core-Security-And-Identity.pdf) | [Video](https://youtu.be/itT73BVRuEQ) |
| 008-Workshop | — | [Video](https://youtu.be/wt-L_Dlf-n8) |
| [009-Testing](009-Testing) | [Csharp-Asp-Net-Core-Testing.pdf](009-Testing/Resources/Csharp-Asp-Net-Core-Testing.pdf) | [Video](https://youtu.be/hm5G4KRLdpk) |
| [010-Project-Architecture](010-Project-Architecture) | [Csharp-Asp-Net-Core-Project-Architecture.pdf](010-Project-Architecture/Resources/Csharp-Asp-Net-Core-Project-Architecture.pdf) | [Video](https://youtu.be/FkhPqmaVNtI) |
| [011-Advanced-Topics](011-Advanced-Topics) | [Csharp-Asp-Net-Core-Advanced-Topics.pdf](011-Advanced-Topics/Resources/Csharp-Asp-Net-Core-Advanced-Topics.pdf) | [Video](https://youtu.be/qLYeDAs0qjo) |
| 012-Workshop | — | [Video](https://youtu.be/ZIuQzAus5rc) |
| [013-Signalr](013-Signalr) | [Csharp-Asp-Net-Core-Signalr.pdf](013-Signalr/Resources/Csharp-Asp-Net-Core-Signalr.pdf) | [Video](https://youtu.be/0sw5v3-1gbY) |
| [014-Azure-Deployment-And-Ci](014-Azure-Deployment-And-Ci) | [Csharp-Asp-Net-Core-Azure-Deployment-And-Ci.pdf](014-Azure-Deployment-And-Ci/Resources/Csharp-Asp-Net-Core-Azure-Deployment-And-Ci.pdf) | [Video](https://youtu.be/5c5m8Su7l1c) |
| [015-Blazor](015-Blazor) | [Csharp-Asp-Net-Core-Blazor.pdf](015-Blazor/Resources/Csharp-Asp-Net-Core-Blazor.pdf) | [Video](https://youtu.be/OZ7JBDcZo3Y) |
