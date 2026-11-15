// Stand-in for the SoftUni practice server: only the endpoints the Pet My Pet spec uses, data in memory.
import { createServer, type IncomingMessage, type ServerResponse } from 'node:http';
import { randomUUID } from 'node:crypto';

type Doc = Record<string, unknown> & { _id: string; _ownerId: string; _createdOn: number };
type User = { _id: string; email: string; password: string };

export function createApp() {
    const users: User[] = [
        { _id: 'peter-id', email: 'peter@abv.bg', password: '123456' },
        { _id: 'john-id', email: 'john@abv.bg', password: '123456' },
    ];
    const sessions = new Map<string, User>();
    const data: Record<string, Doc[]> = {
        pets: [
            {
                _id: 'pet-1',
                _ownerId: 'peter-id',
                _createdOn: 1,
                name: 'Max',
                type: 'dog',
                description: 'Loves long walks and tennis balls.',
                imageUrl: '/images/dog.svg',
            },
            {
                _id: 'pet-2',
                _ownerId: 'john-id',
                _createdOn: 2,
                name: 'Tom',
                type: 'cat',
                description: 'Sleeps 18 hours a day.',
                imageUrl: '/images/cat.svg',
            },
        ],
        likes: [],
    };

    const send = (res: ServerResponse, status: number, body?: unknown) => {
        res.writeHead(status, body === undefined ? {} : { 'Content-Type': 'application/json' });
        res.end(body === undefined ? undefined : JSON.stringify(body));
    };
    const fail = (res: ServerResponse, status: number, message: string) =>
        send(res, status, { code: status, message });

    const readBody = async (req: IncomingMessage) => {
        let raw = '';
        for await (const chunk of req) raw += chunk;
        return raw ? JSON.parse(raw) : {};
    };

    // Supports the subset the spec sends: field="value" [and field="value" ...]
    const matches = (where: string | null) => (doc: Doc) =>
        !where ||
        where.split(/\s+and\s+/i).every((cond) => {
            const [, field, value] = cond.match(/^(\w+)\s*=\s*"(.*)"$/) ?? [];
            if (!field) throw new Error(`Unsupported where clause: ${cond}`);
            return String(doc[field]) === value;
        });

    const query = (docs: Doc[], params: URLSearchParams) => {
        let result = docs.filter(matches(params.get('where')));
        const distinct = params.get('distinct');
        if (distinct)
            result = result.filter(
                (d, i) => result.findIndex((o) => o[distinct] === d[distinct]) === i,
            );
        const [sortField, dir] = (params.get('sortBy') ?? '').split(' ');
        if (sortField) {
            result = [...result].sort((a, b) =>
                (a[sortField] as number) > (b[sortField] as number) ? 1 : -1,
            );
            if (dir === 'desc') result.reverse();
        }
        return params.has('count') ? result.length : result;
    };

    async function handle(req: IncomingMessage, res: ServerResponse) {
        const url = new URL(req.url ?? '/', 'http://localhost');
        const [area, collection, id] = url.pathname.split('/').filter(Boolean);
        const user = sessions.get(String(req.headers['x-authorization'] ?? ''));

        if (area === 'users') {
            if (req.method === 'POST' && (collection === 'login' || collection === 'register')) {
                const { email, password } = await readBody(req);
                if (!email || !password) return fail(res, 400, 'Email and password are required');
                let account = users.find((u) => u.email === email);
                if (collection === 'register') {
                    if (account) return fail(res, 409, 'A user with the same email already exists');
                    account = { _id: randomUUID(), email, password };
                    users.push(account);
                } else if (!account || account.password !== password) {
                    return fail(res, 403, "Login or password don't match");
                }
                const accessToken = randomUUID();
                sessions.set(accessToken, account);
                return send(res, 200, { _id: account._id, email: account.email, accessToken });
            }
            if (req.method === 'GET' && collection === 'logout') {
                if (!user) return fail(res, 401, 'Invalid access token');
                sessions.delete(String(req.headers['x-authorization']));
                return send(res, 204);
            }
            return fail(res, 404, 'Not found');
        }

        const docs = area === 'data' && data[collection];
        if (!docs) return fail(res, 404, 'Not found');
        const doc = id ? docs.find((d) => d._id === id) : undefined;
        if (id && !doc) return fail(res, 404, 'Resource not found');

        if (req.method === 'GET') return send(res, 200, doc ?? query(docs, url.searchParams));
        if (!user) return fail(res, 401, 'Invalid access token');

        if (req.method === 'POST' && !id) {
            const created: Doc = {
                ...(await readBody(req)),
                _id: randomUUID(),
                _ownerId: user._id,
                _createdOn: Date.now(),
            };
            docs.push(created);
            return send(res, 200, created);
        }
        if (!doc) return fail(res, 405, 'Method not allowed');
        if (doc._ownerId !== user._id) return fail(res, 403, 'You are not authorized');
        if (req.method === 'PUT') {
            // PUT replaces the record, keeping only the system fields
            const updated: Doc = {
                ...(await readBody(req)),
                _id: doc._id,
                _ownerId: doc._ownerId,
                _createdOn: doc._createdOn,
            };
            docs[docs.indexOf(doc)] = updated;
            return send(res, 200, updated);
        }
        if (req.method === 'DELETE') {
            docs.splice(docs.indexOf(doc), 1);
            return send(res, 200, { _deletedOn: Date.now() });
        }
        return fail(res, 405, 'Method not allowed');
    }

    return createServer((req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Authorization');
        if (req.method === 'OPTIONS') return send(res, 204);
        handle(req, res).catch((e: Error) => fail(res, 400, e.message));
    });
}

if (import.meta.main) {
    const port = Number(process.env.PORT ?? 3030);
    createApp().listen(port, () => console.log(`Server is listening on http://localhost:${port}`));
}
