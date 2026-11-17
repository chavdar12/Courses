// @vitest-environment node
import type { AddressInfo } from 'node:net';
import { reset, server } from '../server/server';

let base = '';
beforeAll(
    () =>
        new Promise<void>((done) =>
            server.listen(0, () => {
                base = `http://localhost:${(server.address() as AddressInfo).port}`;
                done();
            }),
        ),
);
afterAll(() => new Promise((done) => server.close(done)));
beforeEach(reset);

const call = (path: string, method = 'GET', body?: unknown) =>
    fetch(`${base}${path}`, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body:
            body === undefined ? undefined : typeof body === 'string' ? body : JSON.stringify(body),
    });

test('GET /streams lists the streams with CORS', async () => {
    const res = await call('/streams');
    expect(res.headers.get('access-control-allow-origin')).toBe('*');
    expect(await res.json()).toHaveLength(2);
});

test('POST, PATCH and DELETE change the list', async () => {
    const created = await (
        await call('/streams', 'POST', {
            title: ' New ',
            description: 'Desc',
            userId: 'u1',
            id: 99,
        })
    ).json();
    expect(created).toEqual({ id: 3, title: 'New', description: 'Desc', userId: 'u1' });

    const edited = await (
        await call('/streams/3', 'PATCH', { title: 'Renamed', userId: 'hacker' })
    ).json();
    expect(edited).toEqual({ ...created, title: 'Renamed' });

    expect((await call('/streams/3', 'DELETE')).status).toBe(200);
    expect((await call('/streams/3')).status).toBe(404);
});

test.each([
    [{ title: '', description: 'd', userId: 'u' }, 'title must be 1-100 characters'],
    [{ title: 'x'.repeat(101), description: 'd', userId: 'u' }, 'title must be 1-100 characters'],
    [{ title: 't', description: 42, userId: 'u' }, 'description must be 1-1000 characters'],
    [{ title: 't', description: 'd' }, 'userId is required'],
    ['not json', 'Body must be a JSON object'],
    [[1, 2], 'Body must be a JSON object'],
])('POST rejects %j', async (body, error) => {
    const res = await call('/streams', 'POST', body);
    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ error });
});

test('rejects oversized bodies, unknown routes and methods', async () => {
    expect((await call('/streams', 'POST', { title: 'x'.repeat(20_000) })).status).toBe(413);
    expect((await call('/users')).status).toBe(404);
    expect((await call('/streams/1/extra')).status).toBe(404);
    expect((await call('/streams', 'PUT', {})).status).toBe(405);
    expect((await call('/streams', 'OPTIONS')).status).toBe(204);
});
