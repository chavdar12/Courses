// @vitest-environment node
import type {AddressInfo} from 'node:net';
import {posts, server} from '../server/server';

let base = '';
beforeAll(() => new Promise<void>(done => server.listen(0, () => {
    base = `http://localhost:${(server.address() as AddressInfo).port}`;
    done();
})));
afterAll(() => new Promise(done => server.close(done)));

test('GET /api/origami/ returns all posts with CORS', async () => {
    const res = await fetch(`${base}/api/origami/`);
    expect(res.headers.get('access-control-allow-origin')).toBe('*');
    expect(await res.json()).toEqual(posts);
});

test('unknown routes are 404', async () => {
    expect((await fetch(`${base}/nope`)).status).toBe(404);
});
