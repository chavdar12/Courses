import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { copyFile, mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { client, start } from './helpers.js';

const dir = await mkdtemp(join(tmpdir(), 'cubicle-'));
process.env.DB_FILE = join(dir, 'database.json');
await copyFile(new URL('../config/database.json', import.meta.url), process.env.DB_FILE);
const { default: app } = await import('../app.js');

let server;
let http;
before(async () => {
    server = await start(app);
    http = client(server.base);
});
after(async () => {
    server.close();
    await rm(dir, { recursive: true, force: true });
});

const cube = {
    name: 'Pyraminx',
    description: 'A tetrahedron shaped puzzle',
    imageUrl: 'https://example.com/pyraminx.jpg',
    difficultyLevel: '2'
};

test('home, about and create pages render', async () => {
    assert.match(await http.html('/'), /Rubik&#x27;s Cube/);
    assert.match(await http.html('/about'), /About Cubicle/);
    assert.match(await http.html('/create'), /name="difficultyLevel"/);
});

test('creating a cube stores it with the next id and shows it in details', async () => {
    const res = await http.post('/create', cube);
    assert.equal(res.status, 302);
    assert.equal(res.headers.get('location'), '/');

    const saved = JSON.parse(await readFile(process.env.DB_FILE, 'utf8')).at(-1);
    assert.deepEqual(saved, { ...cube, difficultyLevel: 2, id: 3 });
    assert.match(await http.html('/details/3'), /A tetrahedron shaped puzzle/);
});

test('invalid cubes are rejected with a message', async () => {
    const res = await http.post('/create', { ...cube, imageUrl: 'ftp://nope' });
    assert.equal(res.status, 400);
    assert.match(await res.text(), /notification-message">Image URL must start with http/);
});

test('search filters by name and difficulty range', async () => {
    const byName = await http.html('/?search=mega');
    assert.match(byName, /Megaminx/);
    assert.doesNotMatch(byName, /Rubik/);

    const byRange = await http.html('/?search=&from=4&to=6');
    assert.match(byRange, /Megaminx/);
    assert.doesNotMatch(byRange, /Pyraminx/);

    assert.match(await http.html('/?search=zzz'), /No cubes found/);
});

test('unknown cubes and routes render 404', async () => {
    assert.equal((await http.get('/details/999')).status, 404);
    const res = await http.get('/whatever');
    assert.equal(res.status, 404);
    assert.match(await res.text(), /Page not found/);
});
