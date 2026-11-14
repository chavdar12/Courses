import { before, test } from 'node:test';
import assert from 'node:assert/strict';
import { click as userClick, loadPage, mockFetch, reply, settle, submit } from '../test-utils/dom.mjs';

// page.js is a singleton bound to one window, so the whole file walks through one session.
const make = (n, name = `Recipe ${n}`, owner = 'u2') =>
    ({ _id: `r${n}`, _ownerId: owner, name, img: `${n}.jpg`, ingredients: ['salt'], steps: ['cook'], _createdOn: n });
let recipes = [make(1, 'Easy Lasagna', 'u1'), make(2, 'Roast Trout'), ...[3, 4, 5, 6, 7].map((n) => make(n))];
const comments = [{ _id: 'c1', recipeId: 'r2', content: 'Tasty!' }];

const preview = ({ _id, name, img }) => ({ _id, name, img });
const byId = (id) => () => recipes.find((r) => r._id === id) ?? reply(404, { message: 'Not found' });
const SELECT = '/data/recipes?select=_id%2Cname%2Cimg';
const routes = {
    [`GET ${SELECT}&sortBy=_createdOn%20desc&pageSize=3`]: () => recipes.toSorted((a, b) => b._createdOn - a._createdOn).slice(0, 3).map(preview),
    [`GET ${SELECT}&offset=0&pageSize=5`]: () => recipes.slice(0, 5).map(preview),
    [`GET ${SELECT}&offset=5&pageSize=5`]: () => recipes.slice(5, 10).map(preview),
    'GET /data/recipes?count': () => recipes.length,
    'GET /data/recipes?where=name%20LIKE%20%22lasagna%22': () => recipes.filter((r) => /lasagna/i.test(r.name)),
    'POST /data/recipes': (body) => {
        recipes = [...recipes, { ...body, _id: 'r8', _ownerId: 'u1', _createdOn: 8 }];
        return recipes.at(-1);
    },
    'PUT /data/recipes/r1': (body) => {
        recipes = recipes.map((r) => (r._id === 'r1' ? { ...r, ...body } : r));
        return byId('r1')();
    },
    'DELETE /data/recipes/r1': () => {
        recipes = recipes.filter((r) => r._id !== 'r1');
        return {};
    },
    'POST /data/comments': (body) => {
        comments.push({ ...body, _id: `c${comments.length + 1}` });
        return comments.at(-1);
    },
    'POST /users/register': reply(409, { message: 'A user with the same email already exists' }),
    'POST /users/login': { email: 'peter@abv.bg', _id: 'u1', accessToken: 'tok' },
    'GET /users/logout': reply(204)
};
for (let n = 1; n <= 8; n++) {
    routes[`GET /data/recipes/r${n}`] = byId(`r${n}`);
    routes[`GET /data/comments?where=recipeId%3D%22r${n}%22`] = () => comments.filter((c) => c.recipeId === `r${n}`);
}
const fetch = mockFetch(routes);
let ctx;

const $ = (selector) => ctx.document.querySelector(selector);
const $$ = (selector) => [...ctx.document.querySelectorAll(selector)];
const go = async (selector) => {
    userClick($(selector));
    await settle();
};
const path = () => ctx.window.location.pathname + ctx.window.location.search;
const names = () => $$('.preview h2').map((h) => h.textContent);

before(async () => {
    ctx = await loadPage(new URL('./index.html', import.meta.url), { fetch });
});

test('home shows the three newest recipes', () => {
    assert.equal(path(), '/');
    assert.deepEqual(names(), ['Recipe 7', 'Recipe 6', 'Recipe 5']);
    assert.equal($('#guest').style.display, 'inline-block');
});

test('catalog is paginated by five with controls at the top and bottom', async () => {
    await go('nav a[href="/catalog"]');
    assert.deepEqual(names(), ['Easy Lasagna', 'Roast Trout', 'Recipe 3', 'Recipe 4', 'Recipe 5']);
    assert.equal($$('header.section-title').length, 2);
    assert.match($('header.section-title').textContent, /Page 1 of 2/);

    await go('a.pager[href="/catalog?page=2"]');
    assert.equal(path(), '/catalog?page=2');
    assert.deepEqual(names(), ['Recipe 6', 'Recipe 7']);
    assert.equal($('a.pager[href="/catalog?page=3"]'), null);
});

test('search puts the query in the URL and lists matches', async () => {
    submit($('.section-title form'), { search: 'lasagna' });
    await settle();
    assert.equal(path(), '/catalog?search=lasagna');
    assert.deepEqual(names(), ['Easy Lasagna']);
    assert.equal($('header.section-title'), null);
});

test('guests see comments but no comment form', async () => {
    await go('nav a[href="/catalog"]');
    await go('a[href="/details/r2"]');
    assert.equal($('main h2').textContent, 'Roast Trout');
    assert.equal($('.controls'), null);
    assert.deepEqual($$('.comments li').map((li) => li.textContent), ['Tasty!']);
    assert.equal($('.comments form'), null);
});

test('register shows errors, login signs in and returns home', async () => {
    await go('a[href="/register"]');
    submit($('main form'), { email: 'peter@abv.bg', password: '1', rePass: '2' });
    submit($('main form'), { rePass: '1' });
    await settle();
    assert.deepEqual(ctx.alerts, ['Passwords don\'t match!', 'A user with the same email already exists']);

    await go('a[href="/login"]');
    submit($('main form'), { email: 'peter@abv.bg', password: '1' });
    await settle();
    assert.equal(path(), '/');
    assert.equal($('#user').style.display, 'inline-block');
});

test('logged-in users add comments', async () => {
    await go('a[href="/details/r7"]');
    assert.equal($('.comments li').textContent, 'No comments yet.');
    submit($('.comments form'), { content: 'Great recipe' });
    await settle();
    const post = fetch.calls.find((c) => c.method === 'POST' && c.path === '/data/comments');
    assert.equal(post.headers['x-authorization'], 'tok');
    assert.deepEqual(post.body, { recipeId: 'r7', content: 'Great recipe' });
    assert.deepEqual($$('.comments li').map((li) => li.textContent), ['Great recipe']);
});

test('create route posts a recipe and redirects to its details', async () => {
    await go('a[href="/create"]');
    assert.ok($('a[href="/create"]').classList.contains('active'));
    submit($('main form'), { name: 'Soup', img: 'soup.jpg', ingredients: 'water\nsalt', steps: 'boil' });
    await settle();
    assert.deepEqual(fetch.calls.find((c) => c.method === 'POST' && c.path === '/data/recipes').body,
        { name: 'Soup', img: 'soup.jpg', ingredients: ['water', 'salt'], steps: ['boil'] });
    assert.equal(path(), '/details/r8');
});

test('owner edits and deletes a recipe', async () => {
    await go('nav a[href="/catalog"]');
    await go('a[href="/details/r1"]');
    await go('a[href="/edit/r1"]');
    assert.equal($('textarea[name="ingredients"]').value, 'salt');
    submit($('main form'), { name: 'Lasagna Deluxe' });
    await settle();
    assert.equal(path(), '/details/r1');
    assert.equal($('main h2').textContent, 'Lasagna Deluxe');

    userClick($$('.controls a').at(-1));
    await settle();
    assert.equal(path(), '/catalog');
    assert.equal(names()[0], 'Roast Trout');
});

test('logout returns to guest mode', async () => {
    $('#logoutBtn').click();
    await settle();
    assert.equal(ctx.window.sessionStorage.getItem('userData'), null);
    assert.equal($('#guest').style.display, 'inline-block');
});
