# Modern React with Redux

My solutions for Stephen Grider's Udemy course "Modern React with Redux" (the 2019 project set), rewritten for today:
one self-contained React 19 + TypeScript + Vite app per project, each with its own Vitest + Testing Library tests.
Class components became function components with hooks, and Redux became Redux Toolkit + RTK Query.

| #   | Project                                  | Covers                                                                                    |
| --- | ---------------------------------------- | ----------------------------------------------------------------------------------------- |
| 001 | [Jsx](001-Jsx)                           | JSX expressions, inline styles, `htmlFor`                                                 |
| 002 | [Components](002-Components)             | props, `children`, reusable components, local state                                      |
| 003 | [Seasons](003-Seasons)                   | geolocation in `useEffect`, loading / error states, conditional rendering                 |
| 004 | [Pics](004-Pics)                         | controlled forms, Unsplash search API                                                     |
| 005 | [Videos](005-Videos)                     | YouTube search API, list + detail, embedded player                                        |
| 006 | [Widgets](006-Widgets)                   | accordion, debounced Wikipedia search, dropdown closing on outside clicks, Google Translate, a hand-written router |
| 007 | [Seasons-Hooks](007-Seasons-Hooks)       | the Seasons app with a custom `useLocation` hook                                          |
| 008 | [Videos-Hooks](008-Videos-Hooks)         | the Videos app with a custom `useVideos` hook                                             |
| 009 | [Songs](009-Songs)                       | Redux Toolkit slice, `useSelector` / `useDispatch`                                        |
| 010 | [Blog](010-Blog)                         | RTK Query against JSONPlaceholder; each author is fetched once thanks to the query cache  |
| 011 | [Streams](011-Streams)                   | CRUD with RTK Query and tag invalidation, React Router, form validation, an in-memory API |
| 012 | [Translate](012-Translate)               | React context: a language provider with a hook, plus a second independent context         |

## Run a project

```bash
cd 006-Widgets
npm install
npm run dev        # http://localhost:5173
npm test           # watch mode; npm test -- --run for a single run
npm run build
```

Pics, Videos, Videos-Hooks and Widgets call real APIs. Copy `.env.example` to `.env` and add your own key:

| Project                 | Variable                   | Where to get it                                         |
| ----------------------- | -------------------------- | ------------------------------------------------------- |
| Pics                    | `VITE_UNSPLASH_ACCESS_KEY` | [Unsplash developers](https://unsplash.com/developers)  |
| Videos, Videos-Hooks    | `VITE_YOUTUBE_API_KEY`     | Google Cloud, YouTube Data API v3                       |
| Widgets (Translate tab) | `VITE_GOOGLE_TRANSLATE_KEY` | Google Cloud, Cloud Translation API                    |

Vite puts `VITE_*` values into the browser bundle, so use keys restricted to your domain. The tests mock every API.

## Streams

The course used json-server, Google OAuth and an RTMP server. Here:

- `server/server.ts` is a small in-memory API with the same `/streams` routes, with validation (Node 24 runs the
  TypeScript directly). Data resets on restart.
- **Sign-in is fake**: the "Sign in" button stores the user id `demo-user` in Redux. It only decides which buttons the UI
  shows; the API does not check who you are.
- The show page displays the stream's details, without a video player.

```bash
cd 011-Streams
npm run server     # http://localhost:3001/streams
npm run dev        # in another terminal
```

## Certificate

[Udemy · Modern React with Redux](Resources/Certificate.pdf)

## License

[MIT](LICENSE)
