import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import app from '../app.js';
import Cube from '../models/Cube.js';
import Accessory from '../models/Accessory.js';
import { startDb } from './db.js';
import { client, start } from './helpers.js';

let stopDb;
let server;
let http;
before(async () => {
    stopDb = await startDb();
    server = await start(app);
    http = client(server.base);
});
after(async () => {
    server.close();
    await stopDb();
});

const cube = {
    name: 'Megaminx',
    description: 'Twelve faces',
    imageUrl: 'https://example.com/m.jpg',
    difficultyLevel: '5',
};
const accessory = {
    name: 'Stand',
    description: 'Holds the cube',
    imageUrl: 'https://example.com/s.jpg',
};

test('creates a cube in MongoDB and lists it', async () => {
    const res = await http.post('/create', cube);
    assert.equal(res.status, 302);
    assert.equal(await Cube.countDocuments(), 1);
    assert.match(await http.html('/'), /Megaminx/);
});

test('mongoose validation errors are shown', async () => {
    const res = await http.post('/create', { ...cube, imageUrl: 'nope' });
    assert.equal(res.status, 400);
    assert.match(await res.text(), /Image URL must start with http/);

    const tooHard = await http.post('/create', { ...cube, difficultyLevel: '9' });
    assert.match(await tooHard.text(), /Difficulty must be 1 to 6/);
});

test('search uses name and difficulty range and is regex safe', async () => {
    assert.match(await http.html('/?search=MEGA&from=5&to=6'), /Megaminx/);
    assert.doesNotMatch(await http.html('/?search=&from=1&to=3'), /Megaminx/);
    assert.equal((await http.get('/?search=(')).status, 200);
});

test('accessories are created, offered only once and attached both ways', async () => {
    assert.equal((await http.post('/create/accessory', accessory)).status, 302);
    const { _id: cubeId } = await Cube.findOne();
    const { _id: accessoryId } = await Accessory.findOne();

    assert.match(
        await http.html(`/attach/accessory/${cubeId}`),
        /<option value="[a-f\d]+">Stand<\/option>/,
    );

    const res = await http.post(`/attach/accessory/${cubeId}`, { accessory: String(accessoryId) });
    assert.equal(res.headers.get('location'), `/details/${cubeId}`);
    assert.deepEqual((await Cube.findById(cubeId)).accessories, [accessoryId]);
    assert.deepEqual((await Accessory.findById(accessoryId)).cubes, [cubeId]);

    assert.match(await http.html(`/details/${cubeId}`), /<h3>Stand<\/h3>/);
    assert.match(await http.html(`/attach/accessory/${cubeId}`), /has all available accessories/);
});

test('bad ids render 404', async () => {
    assert.equal((await http.get('/details/not-an-id')).status, 404);
    assert.equal((await http.get('/attach/accessory/000000000000000000000000')).status, 404);
    assert.equal(
        (await http.post('/attach/accessory/000000000000000000000000', { accessory: 'x' })).status,
        404,
    );
});
