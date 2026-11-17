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

## Course materials

Slides, task sheets and lecture videos for each lesson.

| Lesson | Materials | Video |
| ------ | --------- | ----- |
| [001-Internet-Explained](001-Internet-Explained) | [Internet-Explained.pdf](001-Internet-Explained/Resources/Internet-Explained.pdf) | [Video](https://youtu.be/zTEWO1Ozrsk) |
| [001-Spring-Boot-Introduction](001-Spring-Boot-Introduction) | [Spring-Boot-And-Spring-Data-Lab.pdf](001-Spring-Boot-Introduction/Resources/Spring-Boot-And-Spring-Data-Lab.pdf) · [Spring-Boot-Introduction-.pdf](001-Spring-Boot-Introduction/Resources/Spring-Boot-Introduction-.pdf) · [Spring-Boot-Introduction-More-Ex.pdf](001-Spring-Boot-Introduction/Resources/Spring-Boot-Introduction-More-Ex.pdf) | [Video](https://youtu.be/xC7B6fpNLrs) |
| [002-Http-Protocol](002-Http-Protocol) | [Http-Protocol.pdf](002-Http-Protocol/Resources/Http-Protocol.pdf) | [Video](https://youtu.be/7X3fLce5AJQ) |
| [003-Spring-Introduction-MVC](003-Spring-Introduction-MVC) | [Spring-Introduction-Mvc-Lab.pdf](003-Spring-Introduction-MVC/Resources/Spring-Introduction-Mvc-Lab.pdf) · [Spring-Introduction-Mvc.pdf](003-Spring-Introduction-MVC/Resources/Spring-Introduction-Mvc.pdf) | [Video](https://youtu.be/nP-4pXEyG9U) |
| [004-Workshop-Pathfinder-Part-One](004-Workshop-Pathfinder-Part-One) | [Pathfinder-Workshop.pdf](004-Workshop-Pathfinder-Part-One/Resources/Pathfinder-Workshop.pdf) | — |
| [005-State-Management](005-State-Management) | [Spring-Fundamentals-State-Management.pdf](005-State-Management/Resources/Spring-Fundamentals-State-Management.pdf) | [Video](https://youtu.be/maw1U5wJTco) |
| 005-Workshop | — | [Video](https://youtu.be/81Oh1duRiQc) |
| [006-Spring-Essentials](006-Spring-Essentials) | [Spring-Essentials-Lab.pdf](006-Spring-Essentials/Resources/Spring-Essentials-Lab.pdf) · [Spring-Essentials.pdf](006-Spring-Essentials/Resources/Spring-Essentials.pdf) | [Video](https://youtu.be/98Tpwi4YEOk) |
| [008-Workshop-Pathfinder-Part-Two](008-Workshop-Pathfinder-Part-Two) | [Pathfinder-Workshop-Part-Two.pdf](008-Workshop-Pathfinder-Part-Two/Resources/Pathfinder-Workshop-Part-Two.pdf) | — |
| 008-Workshop | — | [Video](https://youtu.be/hEmwHQmlqc0) |
| [009-Thymeleaf-And-Validations](009-Thymeleaf-And-Validations) | [Thymeleaf-And-Validation-Lab.pdf](009-Thymeleaf-And-Validations/Resources/Thymeleaf-And-Validation-Lab.pdf) · [Thymeleaf-And-Validation.pdf](009-Thymeleaf-And-Validations/Resources/Thymeleaf-And-Validation.pdf) | [Video](https://youtu.be/BN__Tlzpw_E) |
