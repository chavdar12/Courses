# SoftUni JS Back-End

Solutions for the SoftUni JS Back-End course: a Node.js `http` server, the Cubicle workshop (Express + Handlebars, then
MongoDB / Mongoose, then authentication with bcrypt and JWT) and two exam-prep apps. Every lecture is a self-contained
npm project with `node --test` tests.

## Lectures

| #   | Lecture | Exercises |
| --- | ------- | --------- |
| 002 | Node.js Streams and Utilities | [Cat Shelter](002-Nodejs-Streams-And-Utilities): plain `http` server, streams, file-based storage |
| 004 | Workshop: Express.js and Templating | [Cubicle, part 1](004-Workshop-Expressjs-And-Templating): Express + Handlebars, create / browse / search cubes |
| 006 | Workshop: MongoDB and Mongoose | [Cubicle, part 2](006-Workshop-Mongodb-And-Mongoose): Mongoose models, accessories, relations |
| 008 | Workshop: Session and Authentication | [Cubicle, parts 3 and 4](008-Workshop-Session-And-Authentication): register / login with bcrypt + JWT cookie, owner-only edit / delete |
| 010 | Exam Preparation: Wildlife Photography | [Wildlife Photography](010-Exam-Preparation): auth, posts CRUD, voting |
| 011 | Exam Preparation: Shared Trip | [Shared Trip](011-Exam-Preparation): auth, trips CRUD, joining a trip |

## Run

Needs Node.js 24 (and MongoDB on `localhost:27017` from lecture 006 on).

```bash
cd 008-Workshop-Session-And-Authentication
npm install
npm start          # see the console for the port
npm test
```

## License

[MIT](LICENSE)

## Course materials

Slides and task sheets from the course, stored next to each lesson.

Course overview: [Javascript-Back-End.pdf](Javascript-Back-End.pdf)

| Lesson | Materials |
| ------ | --------- |
| [001-Intro-To-Nodejs](001-Intro-To-Nodejs) | [Intro-To-Nodejs.pdf](001-Intro-To-Nodejs/Resources/Intro-To-Nodejs.pdf) |
| [002-Nodejs-Streams-And-Utilities](002-Nodejs-Streams-And-Utilities) | [Cat-Shelter-Workshop-Nodejs.pdf](002-Nodejs-Streams-And-Utilities/Resources/Cat-Shelter-Workshop-Nodejs.pdf) · [Nodejs-Streams-And-Utilities.pdf](002-Nodejs-Streams-And-Utilities/Resources/Nodejs-Streams-And-Utilities.pdf) |
| [004-Workshop-Expressjs-And-Templating](004-Workshop-Expressjs-And-Templating) | [Cubicle-Workshop-Part-.pdf](004-Workshop-Expressjs-And-Templating/Resources/Cubicle-Workshop-Part-.pdf) · [Expressjs-And-Templating.pdf](004-Workshop-Expressjs-And-Templating/Resources/Expressjs-And-Templating.pdf) |
| [005-Nosql-And-Mongodb](005-Nosql-And-Mongodb) | [Mongodb-Installation-Guide.docx](005-Nosql-And-Mongodb/Resources/Mongodb-Installation-Guide.docx) · [Nosql-And-Mongodb.pdf](005-Nosql-And-Mongodb/Resources/Nosql-And-Mongodb.pdf) |
| [006-Workshop-Mongodb-And-Mongoose](006-Workshop-Mongodb-And-Mongoose) | [Cubicle-Workshop-Part-.pdf](006-Workshop-Mongodb-And-Mongoose/Resources/Cubicle-Workshop-Part-.pdf) |
| [008-Workshop-Session-And-Authentication](008-Workshop-Session-And-Authentication) | [Cubicle-Workshop-Part-.pdf](008-Workshop-Session-And-Authentication/Resources/Cubicle-Workshop-Part-.pdf) · [Cubicle-Workshop-Part-4.pdf](008-Workshop-Session-And-Authentication/Resources/Cubicle-Workshop-Part-4.pdf) · [Sessions-And-Authentication.pdf](008-Workshop-Session-And-Authentication/Resources/Sessions-And-Authentication.pdf) |
| [009-Validation-And-Error-Handling](009-Validation-And-Error-Handling) | [Validation-And-Error-Handling.pdf](009-Validation-And-Error-Handling/Resources/Validation-And-Error-Handling.pdf) |
| [010-Exam-Preparation](010-Exam-Preparation) | [Wildlife-Photography-.pdf](010-Exam-Preparation/Resources/Wildlife-Photography-.pdf) |
| [011-Exam-Preparation](011-Exam-Preparation) | [Shared-Trip-.pdf](011-Exam-Preparation/Resources/Shared-Trip-.pdf) |
