import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { cp, mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { createServer } from '../src/server.js';

let server;
let base;
let dir;

const readJson = async (name) => JSON.parse(await readFile(join(dir, 'data', `${name}.json`), 'utf8'));
const post = (path, body) => fetch(base + path, { method: 'POST', body, redirect: 'manual' });

before(async () => {
    // work on a copy so tests never touch the real "database"
    dir = await mkdtemp(join(tmpdir(), 'cat-shelter-'));
    await cp(new URL('../data/', import.meta.url), join(dir, 'data'), { recursive: true });
    await cp(new URL('../content/', import.meta.url), join(dir, 'content'), { recursive: true });
    server = createServer({
        dataDir: pathToFileURL(join(dir, 'data/')),
        contentDir: pathToFileURL(join(dir, 'content/'))
    });
    await new Promise((resolve) => server.listen(0, resolve));
    base = `http://localhost:${server.address().port}`;
});

after(async () => {
    server.close();
    await rm(dir, { recursive: true, force: true });
});

test('home page renders and serves static css', async () => {
    const home = await fetch(base + '/');
    assert.equal(home.status, 200);
    assert.match(await home.text(), /Cat Shelter/);

    const css = await fetch(base + '/content/styles/site.css');
    assert.equal(css.headers.get('content-type'), 'text/css');
});

test('static handler refuses paths outside the content folder', async () => {
    const res = await fetch(base + '/content/..%2f..%2fdata/cats.json');
    assert.equal(res.status, 404);
});

test('add breed persists it and lists it on add cat', async () => {
    const res = await post('/cats/add-breed', new URLSearchParams({ breed: 'Persian cat' }));
    assert.equal(res.status, 302);
    assert.equal(res.headers.get('location'), '/');
    assert.ok((await readJson('breeds')).includes('Persian cat'));

    const html = await (await fetch(base + '/cats/add-cat')).text();
    assert.match(html, /<option value="Persian cat">Persian cat<\/option>/);
});

test('empty breed is rejected', async () => {
    const res = await post('/cats/add-breed', new URLSearchParams({ breed: ' ' }));
    assert.equal(res.status, 400);
});

test('add cat with upload, edit, search and shelter', async () => {
    const form = new FormData();
    form.set('name', 'Niya');
    form.set('description', 'Lonely and lazy cat seek for a hospitable owner');
    form.set('breed', 'Bengal Cat');
    form.set('upload', new File([Buffer.from([0x89, 0x50, 0x4e, 0x47])], 'niya.png', { type: 'image/png' }));
    assert.equal((await post('/cats/add-cat', form)).status, 302);

    const [cat] = await readJson('cats');
    assert.equal(cat.name, 'Niya');
    assert.match(cat.image, /^\/content\/images\/[\w-]+\.png$/);
    const image = await fetch(base + cat.image);
    assert.equal(image.headers.get('content-type'), 'image/png');
    assert.deepEqual([...new Uint8Array(await image.arrayBuffer())], [0x89, 0x50, 0x4e, 0x47]);

    const editPage = await (await fetch(`${base}/cats/edit/${cat.id}`)).text();
    assert.match(editPage, /value="Niya"/);
    assert.match(editPage, /<option value="Bengal Cat" selected>/);

    const edit = new FormData();
    edit.set('name', 'Jerry <3');
    edit.set('description', 'Edited');
    edit.set('breed', 'Bombay Cat');
    assert.equal((await post(`/cats/edit/${cat.id}`, edit)).status, 302);
    const [edited] = await readJson('cats');
    assert.equal(edited.name, 'Jerry <3');
    assert.equal(edited.image, cat.image, 'keeps the old image when none is uploaded');

    const found = await (await fetch(base + '/?search=jer')).text();
    assert.match(found, /Jerry &lt;3/, 'names are html-escaped');
    const missing = await (await fetch(base + '/?search=tom')).text();
    assert.match(missing, /No cats found/);

    assert.equal((await post(`/cats/shelter/${cat.id}`, new URLSearchParams())).status, 302);
    assert.deepEqual(await readJson('cats'), []);
});

test('cat without a name or with an unknown breed is rejected', async () => {
    const res = await post('/cats/add-cat', new URLSearchParams({ name: '', breed: 'Bengal Cat' }));
    assert.equal(res.status, 400);
    const bad = await post('/cats/add-cat', new URLSearchParams({ name: 'Tom', breed: 'Dragon' }));
    assert.equal(bad.status, 400);
});

test('unknown cats and routes answer 404', async () => {
    assert.equal((await fetch(base + '/cats/edit/nope')).status, 404);
    assert.equal((await fetch(base + '/nothing-here')).status, 404);
});
