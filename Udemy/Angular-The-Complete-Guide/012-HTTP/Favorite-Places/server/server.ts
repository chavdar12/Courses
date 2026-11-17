// In-memory places API for the Angular app (Node 24 runs this TypeScript directly). Data resets on restart.
import { createServer, type IncomingMessage, type ServerResponse } from 'node:http';

export interface Place {
  id: string;
  title: string;
  country: string;
}

export const places: Place[] = [
  { id: 'p1', title: 'Rila Lakes', country: 'Bulgaria' },
  { id: 'p2', title: 'Plitvice', country: 'Croatia' },
  { id: 'p3', title: 'Lofoten', country: 'Norway' },
  { id: 'p4', title: 'Cappadocia', country: 'Turkey' },
];
export let userPlaceIds: string[] = [];

export function reset() {
  userPlaceIds = [];
}

const send = (res: ServerResponse, status: number, body?: unknown) => {
  res.writeHead(status, { 'content-type': 'application/json' });
  res.end(body === undefined ? undefined : JSON.stringify(body));
};

async function readJson(req: IncomingMessage): Promise<unknown> {
  let raw = '';
  for await (const chunk of req) {
    raw += chunk;
    if (raw.length > 10_000) throw new Error('too large');
  }
  return JSON.parse(raw);
}

const userPlaces = () => places.filter((p) => userPlaceIds.includes(p.id));

export const server = createServer(async (req, res) => {
  const url = new URL(req.url ?? '/', 'http://localhost');
  if (req.method === 'GET' && url.pathname === '/api/places') return send(res, 200, { places });
  if (req.method === 'GET' && url.pathname === '/api/user-places')
    return send(res, 200, { places: userPlaces() });

  if (req.method === 'PUT' && url.pathname === '/api/user-places') {
    let body: unknown;
    try {
      body = await readJson(req);
    } catch {
      return send(res, 400, { message: 'Invalid JSON body' });
    }
    const placeId = (body as { placeId?: unknown })?.placeId;
    if (typeof placeId !== 'string' || !places.some((p) => p.id === placeId))
      return send(res, 422, { message: 'Unknown placeId' });
    if (!userPlaceIds.includes(placeId)) userPlaceIds.push(placeId);
    return send(res, 200, { places: userPlaces() });
  }

  const match = url.pathname.match(/^\/api\/user-places\/([\w-]+)$/);
  if (req.method === 'DELETE' && match) {
    userPlaceIds = userPlaceIds.filter((id) => id !== match[1]);
    return send(res, 200, { places: userPlaces() });
  }
  send(res, 404, { message: 'Not found' });
});

if (import.meta.main) {
  server.listen(3000, () => console.log('API on http://localhost:3000/api'));
}
