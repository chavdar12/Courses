import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import app from '../app.js';
import Cube from '../models/Cube.js';
import User from '../models/User.js';
import { startDb } from './db.js';
import { client, start } from './helpers.js';

let stopDb;
let server;
before(async () => {
    stopDb = await startDb();
    server = await start(app);
});
after(async () => {
    server.close();
    await stopDb();
});

const cube = {
    name: 'Megaminx Puzzle',
    description: 'A dodecahedron with twelve faces',
    imageUrl: 'https://example.com/m.jpg',
    difficultyLevel: '5'
};
const accessory = { name: 'Cube Stand', description: 'Holds the cube on your desk', imageUrl: 'https://example.com/s.jpg' };

async function registered(username) {
    const http = client(server.base);
    const res = await http.post('/register', { username, password: 'secret123', repeatPassword: 'secret123' });
    assert.equal(res.status, 302, `register ${username}`);
    return http;
}

test('register hashes the password, logs in and swaps the navigation', async () => {
    const http = await registered('peter1');
    const user = await User.findOne({ username: 'peter1' });
    assert.notEqual(user.password, 'secret123');
    assert.match(user.password, /^\$2b\$/);

    const home = await http.html('/');
    assert.match(home, /Logout/);
    assert.doesNotMatch(home, /Register/);
});

test('register and login validation messages', async () => {
    const http = client(server.base);
    const cases = [
        [{ username: 'abc', password: 'secret123', repeatPassword: 'secret123' }, 'at least 5 characters'],
        [{ username: 'abc d1', password: 'secret123', repeatPassword: 'secret123' }, 'only English letters and digits'],
        [{ username: 'george', password: 'short', repeatPassword: 'short' }, 'at least 8 characters'],
        [{ username: 'george', password: 'secret123', repeatPassword: 'other1234' }, 'Passwords do not match'],
        [{ username: 'peter1', password: 'secret123', repeatPassword: 'secret123' }, 'already taken']
    ];
    for (const [form, message] of cases) {
        const res = await http.post('/register', form);
        assert.equal(res.status, 400);
        assert.match(await res.text(), new RegExp(`notification-message">[^<]*${message}`));
    }
    const bad = await http.post('/login', { username: 'peter1', password: 'wrongpass1' });
    assert.match(await bad.text(), /Invalid username or password/);
    assert.equal((await http.post('/login', { username: 'peter1', password: 'secret123' })).status, 302);
});

test('guards: guests cannot create, users cannot see login', async () => {
    const guest = client(server.base);
    for (const path of ['/create', '/create/accessory', '/logout']) {
        assert.equal((await guest.get(path)).headers.get('location'), '/', path);
    }
    const user = await registered('maria1');
    assert.equal((await user.get('/login')).headers.get('location'), '/');
    assert.equal((await user.get('/register')).headers.get('location'), '/');

    await user.get('/logout');
    assert.match(await user.html('/'), /Login/);
});

test('cube validation follows part 4 rules', async () => {
    const http = await registered('ivan12');
    const short = await http.post('/create', { ...cube, name: 'Mega' });
    assert.match(await short.text(), /Name must be at least 5 characters/);
    const symbols = await http.post('/create', { ...cube, description: 'Twelve faces <script> and more' });
    assert.match(await symbols.text(), /only English letters, digits and whitespaces/);
    const accessoryRes = await http.post('/create/accessory', { ...accessory, description: 'too short' });
    assert.match(await accessoryRes.text(), /Description must be at least 20 characters/);
});

test('only the creator sees and uses edit and delete', async () => {
    const owner = await registered('owner1');
    assert.equal((await owner.post('/create', cube)).status, 302);
    const { _id: id } = await Cube.findOne({ name: cube.name });

    assert.match(await owner.html(`/details/${id}`), /href="\/edit\//);
    assert.match(await owner.html(`/edit/${id}`), /<option value="5" selected>/);

    const other = await registered('other1');
    assert.doesNotMatch(await other.html(`/details/${id}`), /href="\/edit\//);
    assert.equal((await other.get(`/edit/${id}`)).headers.get('location'), '/');
    assert.equal((await other.post(`/delete/${id}`, {})).headers.get('location'), '/');
    assert.ok(await Cube.findById(id));

    const edited = await owner.post(`/edit/${id}`, { ...cube, difficultyLevel: '6' });
    assert.equal(edited.headers.get('location'), `/details/${id}`);
    assert.equal((await Cube.findById(id)).difficultyLevel, 6);
    const invalid = await owner.post(`/edit/${id}`, { ...cube, imageUrl: 'nope' });
    assert.match(await invalid.text(), /Image URL must start with http/);

    assert.match(await owner.html(`/delete/${id}`), /disabled/);
    assert.equal((await owner.post(`/delete/${id}`, {})).headers.get('location'), '/');
    assert.equal(await Cube.findById(id), null);
});

test('logged in users attach accessories', async () => {
    const http = await registered('attach1');
    await http.post('/create', cube);
    await http.post('/create/accessory', accessory);
    const { _id: id } = await Cube.findOne({ name: cube.name });
    const options = await http.html(`/attach/accessory/${id}`);
    const accessoryId = options.match(/<option value="([a-f\d]+)">Cube Stand/)[1];
    await http.post(`/attach/accessory/${id}`, { accessory: accessoryId });
    assert.match(await http.html(`/details/${id}`), /<h3>Cube Stand<\/h3>/);
});

test('a tampered token is dropped and treated as a guest', async () => {
    const res = await fetch(`${server.base}/create`, { redirect: 'manual', headers: { cookie: 'token=forged.jwt.value' } });
    assert.equal(res.headers.get('location'), '/');
    assert.match(res.headers.get('set-cookie'), /token=;/);
});
