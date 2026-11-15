# SoftUni Spring Advanced

Solutions for the SoftUni Spring Advanced course: REST controllers, Spring Security, HATEOAS, error handling, events and
scheduling, AOP, testing, OpenAPI + Docker and Actuator monitoring. Every lecture is a self-contained Gradle project;
the apps that need a database use in-memory H2, so nothing has to be installed.

## Lectures

| #   | Lecture | Exercises |
| --- | ------- | --------- |
| 001 | Web API and REST Controllers | [Books API](001-Web-API-And-REST-Controllers): REST controller + a client calling it |
| 002 | Exercise: Web API and REST Controllers | [Books API](002-Exercise-Web-API-And-REST-Controllers): CRUD REST endpoints |
| 003 | Spring Security | [Security demo](003-Spring-Security): login, roles, admin seeder, filter and interceptor |
| 004 | HATEOAS | [Students API](004-HATEOAS): HATEOAS links for students, courses and orders |
| 005 | Error Handling | [Products](005-Error-Handling): MVC error pages and a global REST exception handler |
| 006 | Events | [Events demo](006-Events): application events and listeners, caching, scheduled tasks |
| 007 | AOP | [AOP demo](007-AOP): before / around aspects, argument modifying, latency tracking |
| 008 | Unit and Integration Testing | [Authors and users](008-Unit-And-Integration-Testing): unit tests with mocks, `MockMvc` integration tests |
| 009 | Containerization and Documentation | [Courses API](009-Containerization-And-Documentation): OpenAPI docs, Dockerfile |
| 010 | Deployment, Hosting and Monitoring | [Greeting app](010-Deployment-Hosting-And-Monitoring): Actuator with a custom endpoint |

## Run

Needs JDK 25.

```bash
cd 004-HATEOAS
./gradlew bootRun    # http://localhost:8080
./gradlew build      # tests
```

## License

[MIT](LICENSE)
