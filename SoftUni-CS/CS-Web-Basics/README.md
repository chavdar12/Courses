# SoftUni C# Web Basics

Solutions for the SoftUni C# Web Basics course: threads and async tasks, and the SIS web server built from raw sockets
(HTTP parsing, routing, then cookies and sessions). Each lecture folder is its own solution with tests.

## Lectures

| #   | Lecture | Exercises |
| --- | ------- | --------- |
| 002 | Web Server: Asynchronous Processing | [Chronometer](002-Web-Server-Asynchronous-Processing/Chronometer) · [Even Numbers Thread](002-Web-Server-Asynchronous-Processing/EvenNumbersThread) · [Parallel Merge Sort](002-Web-Server-Asynchronous-Processing/ParallelMergeSort) · [Sum Primes](002-Web-Server-Asynchronous-Processing/SumPrimes)<br>SIS web server, async: [HTTP](002-Web-Server-Asynchronous-Processing/SIS.HTTP) · [WebServer](002-Web-Server-Asynchronous-Processing/SIS.WebServer) · [Demo](002-Web-Server-Asynchronous-Processing/SIS.Demo) |
| 003 | Web Server: State Management | SIS web server with cookies and sessions: [HTTP](003-Web-Server-State-Management/SIS.HTTP) · [WebServer](003-Web-Server-State-Management/SIS.WebServer) · [Demo](003-Web-Server-State-Management/SIS.Demo) |

## Run

Needs the .NET 10 SDK.

```bash
dotnet test 003-Web-Server-State-Management/003-Web-Server-State-Management.slnx
dotnet run --project 003-Web-Server-State-Management/SIS.Demo
```

## License

[MIT](LICENSE)

## Course materials

Slides, task sheets and lecture videos for each lesson.

| Lesson | Materials | Video |
| ------ | --------- | ----- |
| [001-Web-Server-Http-Protocol](001-Web-Server-Http-Protocol) | [Csharp-Web-Basics-Server-Http.pdf](001-Web-Server-Http-Protocol/Resources/Csharp-Web-Basics-Server-Http.pdf) | [Video](https://youtu.be/f0sqOnKwIMg) |
| [002-Web-Server-Asynchronous-Processing](002-Web-Server-Asynchronous-Processing) | [Csharp-Web-Basics-Web-Server-Asynchronous-Processing-Lab.pdf](002-Web-Server-Asynchronous-Processing/Resources/Csharp-Web-Basics-Web-Server-Asynchronous-Processing-Lab.pdf) · [Csharp-Web-Basics-Web-Server-Asynchronous-Processing.pdf](002-Web-Server-Asynchronous-Processing/Resources/Csharp-Web-Basics-Web-Server-Asynchronous-Processing.pdf) | [Video](https://youtu.be/6ibb0RHTO8k) |
| [003-Web-Server-State-Management](003-Web-Server-State-Management) | [Csharp-Web-Basics-Web-Server-State-Management-L.pdf](003-Web-Server-State-Management/Resources/Csharp-Web-Basics-Web-Server-State-Management-L.pdf) · [Csharp-Web-Basics-Web-Server-State-Management.pdf](003-Web-Server-State-Management/Resources/Csharp-Web-Basics-Web-Server-State-Management.pdf) | [Video](https://youtu.be/rGFb9OJXJpw) |
| 004-Workshop | — | [Video](https://youtu.be/YPiuv8sljlY) |
| [005-Mvc-Introduction](005-Mvc-Introduction) | [Csharp-Web-Basics-Mvc-Introduction.pdf](005-Mvc-Introduction/Resources/Csharp-Web-Basics-Mvc-Introduction.pdf) | [Video](https://youtu.be/PDvQOQ42jaI) |
| 006-MVC-Advanced-View-Engine | — | [Video](https://youtu.be/jy4owq-aR3g) |
| 007-Workshop | — | [Video](https://youtu.be/Hri4BW3o6w8) |
| 008-MVC-Advanced-IoC-and-Data-Binding | — | [Video](https://youtu.be/DO_H4eLIwGA) |
| 009-Workshop | — | [Video](https://youtu.be/CItncWowEPY) |
