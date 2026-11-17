import http from 'node:http';
import { createStore } from './store.js';
import { homeHandler } from './handlers/home.js';
import { staticHandler } from './handlers/static-files.js';
import { catHandler } from './handlers/cat.js';

/** Builds the http server; each handler returns true when it answered the request. */
export function createServer({ dataDir, contentDir }) {
    const options = { store: createStore(dataDir), contentDir };
    const handlers = [homeHandler, staticHandler, catHandler].map((handler) => handler(options));

    return http.createServer(async (req, res) => {
        const url = new URL(req.url, 'http://localhost');
        try {
            for (const handler of handlers) {
                if (await handler(req, res, url)) {
                    return;
                }
            }
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('404 Not Found');
        } catch (err) {
            console.error(err);
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('500 Internal Server Error');
        }
    });
}
