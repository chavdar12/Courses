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
