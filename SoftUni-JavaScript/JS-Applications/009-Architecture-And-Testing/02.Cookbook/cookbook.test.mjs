import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { loadPage, mockFetch, settle, submit } from '../test-utils/dom.mjs';

const make = (n, name = `Recipe ${n}`, owner = 'u2') =>
    ({ _id: `r${n}`, _ownerId: owner, name, img: `${n}.jpg`, ingredients: ['salt', 'pepper'], steps: ['cook'], _createdOn: n });
const recipes = [make(1, 'Easy Lasagna', 'u1'), make(2, 'Roast Trout'), ...[3, 4, 5, 6, 7].map((n) => make(n))];
const preview = ({ _id, name, img }) => ({ _id, name, img });
const SELECT = '/data/recipes?select=_id%2Cname%2Cimg';
const user = { userData: JSON.stringify({ email: 'peter@abv.bg', id: 'u1', token: 'tok' }) };

function start({ storage } = {}) {
    const routes = {
        [`GET ${SELECT}&sortBy=_createdOn%20desc&pageSize=3`]: recipes.toReversed().slice(0, 3).map(preview),
        [`GET ${SELECT}&offset=0&pageSize=5`]: recipes.slice(0, 5).map(preview),
        [`GET ${SELECT}&offset=5&pageSize=5`]: recipes.slice(5).map(preview),
        'GET /data/recipes?count': recipes.length,
        'POST /data/recipes': (body) => ({ ...body, _id: 'r1', _ownerId: 'u1' }),
        'PUT /data/recipes/r1': (body) => ({ ...body, _id: 'r1', _ownerId: 'u1' }),
        'DELETE /data/recipes/r1': {},
        'POST /users/register': { email: 'new@abv.bg', _id: 'u3', accessToken: 'new' },
        'POST /users/login': { email: 'peter@abv.bg', _id: 'u1', accessToken: 'tok' }
    };
    recipes.forEach((r) => (routes[`GET /data/recipes/${r._id}`] = r));
    return loadPage(new URL('./index.html', import.meta.url), { fetch: mockFetch(routes), session: storage });
}

const names = (document) => [...document.querySelectorAll('.preview h2')].map((h) => h.textContent);
const call = (fetch, method, path) => fetch.calls.find((c) => c.method === method && c.path === path);
async function click(element) {
    element.click();
    await settle();
}
async function openRecipe(document, name) {
    await click(document.querySelector('[data-view="catalog"]'));
    await click([...document.querySelectorAll('.preview')].find((p) => p.textContent.includes(name)));
}

describe('home', () => {
    test('starts with the three newest recipes, newest first', async () => {
        const { document } = await start();
        assert.match(document.querySelector('.hero').textContent, /Welcome/);
        assert.deepEqual(names(document), ['Recipe 7', 'Recipe 6', 'Recipe 5']);
    });

    test('the title link goes back home', async () => {
        const { document } = await start();
        await click(document.querySelector('[data-view="catalog"]'));
        await click(document.querySelector('h1 a'));
        assert.ok(document.querySelector('.hero'));
    });
});

describe('catalog', () => {
    test('loads and renders the first page with controls at the top and bottom', async () => {
        const { document } = await start();
        await click(document.querySelector('[data-view="catalog"]'));
        assert.deepEqual(names(document), ['Easy Lasagna', 'Roast Trout', 'Recipe 3', 'Recipe 4', 'Recipe 5']);
        const pagers = document.querySelectorAll('header.section-title');
        assert.equal(pagers.length, 2);
        assert.match(pagers[1].textContent, /Page 1 of 2/);
    });

    test('next page shows the rest', async () => {
        const { document } = await start();
        await click(document.querySelector('[data-view="catalog"]'));
        await click(document.querySelector('a.pager'));
        assert.deepEqual(names(document), ['Recipe 6', 'Recipe 7']);
        assert.equal(document.querySelector('a.pager').textContent, '< Prev');
    });

    test('displays the recipe details', async () => {
        const { document } = await start();
        await openRecipe(document, 'Roast Trout');
        assert.equal(document.querySelector('main h2').textContent, 'Roast Trout');
        assert.deepEqual([...document.querySelectorAll('.ingredients li')].map((li) => li.textContent), ['salt', 'pepper']);
        assert.equal(document.querySelector('.controls'), null);
    });
});

describe('authentication', () => {
    test('register makes the correct API call and stores the session', async () => {
        const { document, fetch, window } = await start();
        await click(document.querySelector('[data-view="register"]'));
        submit(document.querySelector('main form'), { email: 'new@abv.bg', password: '123', rePass: '123' });
        await settle();
        assert.deepEqual(call(fetch, 'POST', '/users/register').body, { email: 'new@abv.bg', password: '123' });
        assert.equal(JSON.parse(window.sessionStorage.getItem('userData')).token, 'new');
        assert.equal(document.getElementById('user').style.display, 'inline-block');
    });

    test('login makes the correct API call', async () => {
        const { document, fetch } = await start();
        await click(document.querySelector('[data-view="login"]'));
        submit(document.querySelector('main form'), { email: 'peter@abv.bg', password: '123' });
        await settle();
        assert.deepEqual(call(fetch, 'POST', '/users/login').body, { email: 'peter@abv.bg', password: '123' });
    });
});

describe('CRUD', () => {
    test('create makes the correct API call for a logged-in user', async () => {
        const { document, fetch } = await start({ storage: user });
        await click(document.querySelector('[data-view="create"]'));
        submit(document.querySelector('main form'), { name: 'Soup', img: 's.jpg', ingredients: 'water\nsalt', steps: 'boil' });
        await settle();
        const post = call(fetch, 'POST', '/data/recipes');
        assert.equal(post.headers['x-authorization'], 'tok');
        assert.deepEqual(post.body, { name: 'Soup', img: 's.jpg', ingredients: ['water', 'salt'], steps: ['boil'] });
    });

    test('the author sees the Edit and Delete buttons', async () => {
        const { document } = await start({ storage: user });
        await openRecipe(document, 'Easy Lasagna');
        assert.deepEqual([...document.querySelectorAll('.controls a')].map((a) => a.textContent), ['✎ Edit', '✖ Delete']);
    });

    test('edit loads the recipe data and makes the correct API call', async () => {
        const { document, fetch } = await start({ storage: user });
        await openRecipe(document, 'Easy Lasagna');
        await click(document.querySelector('.controls a'));
        const form = document.querySelector('main form');
        assert.equal(form.elements.name.value, 'Easy Lasagna');
        assert.equal(form.elements.ingredients.value, 'salt\npepper');

        submit(form, { name: 'Lasagna Deluxe' });
        await settle();
        const put = call(fetch, 'PUT', '/data/recipes/r1');
        assert.equal(put.headers['x-authorization'], 'tok');
        assert.equal(put.body.name, 'Lasagna Deluxe');
    });

    test('delete makes the correct API call', async () => {
        const { document, fetch } = await start({ storage: user });
        await openRecipe(document, 'Easy Lasagna');
        await click(document.querySelectorAll('.controls a')[1]);
        assert.equal(call(fetch, 'DELETE', '/data/recipes/r1').headers['x-authorization'], 'tok');
        assert.ok(document.querySelector('header.section-title'));
    });
});
