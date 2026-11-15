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
