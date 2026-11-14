# SoftUni ReactJS

Solutions for the SoftUni ReactJS course: one self-contained React 19 + TypeScript + Vite app per lecture, each with its own
Vitest + Testing Library tests. The course final project lives in
[SoftUni-React-Final-Project](https://github.com/chavdar12/SoftUni-React-Final-Project).

| #   | Lecture                                                    | Project                                                                          | Covers                                                                  |
| --- | ---------------------------------------------------------- | -------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| 001 | Intro to React and JSX                                     | [Jsx-App](001-Intro-To-React-And-Jsx/Jsx-App)                                    | JSX expressions, `createElement`, composition                           |
| 002 | Components – Basic Idea                                    | [Components-App](002-Components-Basic-Idea/Components-App)                       | function vs class components, props, children, state, events, conditionals |
| 003 | Components – Deep Dive                                     | [Deep-Dive-App](003-Components-Deep-Dive/Deep-Dive-App)                          | lists & keys, lifecycle, HOC, CSS modules, fetch service                |
| 004 | Workshop: Components                                       | [Origami](004-Workshop-Components/Origami)                                       | Origami platform layout, posts fetched from the API                     |
| 005 | Routing                                                    | [Routing-App](005-Routing/Routing-App)                                           | params, `NavLink`, nested routes, redirects, 404, `lazy` + `Suspense`   |
| 006 | Workshop: Single Page Application                          | [Pet-My-Pet](006-Workshop-Single-Page-Application/Pet-My-Pet)                    | auth, CRUD, my pets, likes (bonus)                                      |
| 007 | Forms                                                      | [Register-Form-App](007-Forms/Register-Form-App)                                 | controlled form with validation, uncontrolled form with a ref           |
| 008 | React Hooks                                                | [Hooks-App](008-React-Hooks/Hooks-App)                                           | `useState`, `useEffect` + cleanup, custom hook, context                 |
| 010 | Advanced Techniques                                        | [Advanced-App](010-Advanced-Techniques/Advanced-App)                             | context provider, HOC, `useReducer`, error boundaries, unit tests       |

## Run a project

```bash
cd 005-Routing/Routing-App
npm install
npm run dev        # http://localhost:5173
npm test           # watch mode; npm test -- --run for a single run
npm run build
```

The two workshops ship a small in-memory API in `server/` (Node 24 runs the TypeScript directly), so they work without
MongoDB or the original SoftUni server:

| Project    | Start the API    | Listens on                                                 | Accounts                                                  |
| ---------- | ---------------- | ---------------------------------------------------------- | --------------------------------------------------------- |
| Origami    | `npm run server` | `http://localhost:9999/api/origami/`                       | –                                                         |
| Pet-My-Pet | `npm run server` | `http://localhost:3030` (practice-server compatible routes) | `peter@abv.bg` / `123456`, `john@abv.bg` / `123456`       |

Run `npm run server` in one terminal and `npm run dev` in another. Data resets on restart.

## License

[MIT](LICENSE)
