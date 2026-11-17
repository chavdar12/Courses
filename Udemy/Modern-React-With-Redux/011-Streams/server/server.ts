// Stand-in for the course's json-server: the same /streams routes, data in memory.
import { createServer, type IncomingMessage, type ServerResponse } from 'node:http';

export type Stream = { id: number; title: string; description: string; userId: string };

const seed = (): Stream[] => [
    {
        id: 1,
        title: 'Live coding a todo app',
        description: 'React 19 and Redux Toolkit from scratch.',
        userId: 'demo-user',
    },
    {
        id: 2,
        title: 'Speedrunning CSS grid',
        description: 'Every grid property in one hour.',
        userId: 'someone-else',
    },
];

export let streams = seed();
let nextId = 3;

export function reset() {
    streams = seed();
    nextId = 3;
}

const MAX_BODY = 10_000;

class HttpError extends Error {
    constructor(
        public status: number,
        message: string,
    ) {
        super(message);
    }
}

async function readJson(req: IncomingMessage): Promise<Record<string, unknown>> {
    let raw = '';
    for await (const chunk of req) {
        raw += chunk;
        if (raw.length > MAX_BODY) throw new HttpError(413, 'Body too large');
    }
    try {
        const body = JSON.parse(raw);
        if (body && typeof body === 'object' && !Array.isArray(body)) return body;
    } catch {
        // fall through
    }
    throw new HttpError(400, 'Body must be a JSON object');
}

// only the fields a client may set, each checked; partial for PATCH
function validate(body: Record<string, unknown>, partial: boolean) {
    const limits = { title: 100, description: 1000 } as const;
    const out: Partial<Pick<Stream, 'title' | 'description'>> = {};
    for (const [field, max] of Object.entries(limits) as [keyof typeof limits, number][]) {
        const value = body[field];
        if (value === undefined && partial) continue;
        if (typeof value !== 'string' || !value.trim() || value.length > max) {
            throw new HttpError(400, `${field} must be 1-${max} characters`);
        }
        out[field] = value.trim();
    }
    return out;
}

function send(res: ServerResponse, status: number, body?: unknown) {
    res.writeHead(status, { 'Content-Type': 'application/json' }).end(
        body === undefined ? undefined : JSON.stringify(body),
    );
}

export const server = createServer(async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') return void res.writeHead(204).end();

    const [, resource, rawId, extra] = (req.url ?? '').split('?')[0].split('/');
    if (resource !== 'streams' || extra !== undefined)
        return send(res, 404, { error: 'Not found' });

    try {
        if (!rawId) {
            if (req.method === 'GET') return send(res, 200, streams);
            if (req.method === 'POST') {
                const body = await readJson(req);
                if (typeof body.userId !== 'string' || !body.userId)
                    throw new HttpError(400, 'userId is required');
                const stream = {
                    id: nextId++,
                    ...validate(body, false),
                    userId: body.userId,
                } as Stream;
                streams.push(stream);
                return send(res, 201, stream);
            }
            return send(res, 405, { error: 'Method not allowed' });
        }

        const stream = streams.find((s) => String(s.id) === rawId);
        if (!stream) return send(res, 404, { error: 'Stream not found' });
        if (req.method === 'GET') return send(res, 200, stream);
        if (req.method === 'PATCH')
            return send(res, 200, Object.assign(stream, validate(await readJson(req), true)));
        if (req.method === 'DELETE') {
            streams = streams.filter((s) => s !== stream);
            return send(res, 200, {});
        }
        return send(res, 405, { error: 'Method not allowed' });
    } catch (e) {
        if (e instanceof HttpError) return send(res, e.status, { error: e.message });
        throw e;
    }
});

if (import.meta.main) {
    const port = Number(process.env.PORT ?? 3001);
    server.listen(port, () => console.log(`Streams API on http://localhost:${port}/streams`));
}
