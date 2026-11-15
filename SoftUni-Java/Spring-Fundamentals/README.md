# SoftUni Spring Fundamentals

Solutions for the SoftUni Spring Fundamentals course: Spring Boot, MVC with Thymeleaf, state management, validation,
the Mobilele and Pathfinder apps, and the exam projects. Every lecture is a self-contained Gradle project.

## Lectures

| #   | Lecture | Exercises |
| --- | ------- | --------- |
| 001 | Spring Boot Introduction | [Mobilele](001-Spring-Boot-Introduction): car offers – brands, models, users and roles entities |
| 002 | Exercise: Spring Boot Introduction | [Supermarket](002-Exercise-Spring-Boot-Introduction): console app over categories, products, sellers, shops, towns |
| 003 | Spring Introduction MVC | [Mobilele](003-Spring-Introduction-MVC): controllers and Thymeleaf views |
| 004 | Workshop: Pathfinder, part 1 | [Pathfinder](004-Workshop-Pathfinder-Part-One): hiking routes – entities, data and pages |
| 005 | State Management | [Cookies demo](005-State-Management) |
| 006 | Spring Essentials | [Mobilele](006-Spring-Essentials): offers CRUD, login / register, validation |
| 007 | Spring Essentials: Cloudinary Demo | [Picture upload](007-Spring-Essentials-Cloudinary-Demo) to Cloudinary |
| 008 | Workshop: Pathfinder, part 2 | [Pathfinder](008-Workshop-Pathfinder-Part-Two): routes, comments, pictures, users |
| 009 | Thymeleaf and Validations | [LinkedOut](009-Thymeleaf-And-Validations): companies and employees with Thymeleaf forms and validation |
| 010 | Exam Preparation: Coffee Shop | [Coffee Shop](010-Exam-Preparation-Coffee-Shop): register / login, orders, employee stats |
| 011 | Bootstrap & Front-End Basics | JS tasks: [Argument Info](011-Bootstrap-Front-End-Basics/src/argument-info.js) · [Cappy Juice](011-Bootstrap-Front-End-Basics/src/cappy-juice.js) · [Heroic Inventory](011-Bootstrap-Front-End-Basics/src/heroic-inventory.js) · [JSON's Table](011-Bootstrap-Front-End-Basics/src/jsons-table.js) · [Personal BMI](011-Bootstrap-Front-End-Basics/src/personal-bmi.js) · [Sort Array](011-Bootstrap-Front-End-Basics/src/sort-array.js) |
| 012 | Regular Exam: Battle Ships | [Battle Ships](012-Regular-Exam-Battle-Ships): register / login, add ships, battles |
| 013 | Retake Exam: Shopping List | [Shopping List](013-Retake-Exam-Shopping-List): register / login, products by category, buy all |

## Run

Needs JDK 25 and MySQL on `localhost:3306` (credentials from `DB_USERNAME` / `DB_PASSWORD`; default `root` with no password).

```bash
cd 012-Regular-Exam-Battle-Ships
./gradlew bootRun    # http://localhost:8080
./gradlew build      # tests
```

The Bootstrap lecture is JavaScript: `cd 011-Bootstrap-Front-End-Basics && npm install && npm test`.

## License

[MIT](LICENSE)
