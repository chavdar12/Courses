import { before, test } from 'node:test';
import assert from 'node:assert/strict';
import { loadPage, mockFetch, reply, settle, submit } from '../test-utils/dom.mjs';

const make = (n, name = `Recipe ${n}`, owner = 'u2') =>
    ({ _id: `r${n}`, _ownerId: owner, name, img: `${n}.jpg`, ingredients: ['salt'], steps: ['cook'], _createdOn: n });
let recipes = [make(1, 'Easy Lasagna', 'u1'), make(2, 'Roast Trout'), ...[3, 4, 5, 6, 7].map((n) => make(n))];
const comments = [{ _id: 'c1', recipeId: 'r2', content: 'Tasty!' }];

const preview = ({ _id, name, img }) => ({ _id, name, img });
const byId = (id) => () => recipes.find((r) => r._id === id);
const SELECT = '/data/recipes?select=_id%2Cname%2Cimg';
const routes = {
    [`GET ${SELECT}&sortBy=_createdOn%20desc&pageSize=3`]: () => recipes.toSorted((a, b) => b._createdOn - a._createdOn).slice(0, 3).map(preview),
    [`GET ${SELECT}&offset=0&pageSize=5`]: () => recipes.slice(0, 5).map(preview),
    [`GET ${SELECT}&offset=5&pageSize=5`]: () => recipes.slice(5, 10).map(preview),
    'GET /data/recipes?count': () => recipes.length,
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
    'POST /data/comments': (body) => comments.push(body) && body,
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
const click = async (element) => {
    element.click();
    await settle();
};
const preview$ = (name) => $$('.preview').find((p) => p.querySelector('h2').textContent === name);
const names = () => $$('.preview h2').map((h) => h.textContent);
const comment$ = () => $$('.comments li').map((li) => li.textContent.trim());

before(async () => {
    ctx = await loadPage(new URL('./index.html', import.meta.url), { fetch });
});

test('starts on home with the three newest recipes', () => {
    assert.deepEqual(names(), ['Recipe 7', 'Recipe 6', 'Recipe 5']);
    assert.equal($('#guest').style.display, 'inline-block');
});

test('catalog pages by five', async () => {
    await click($('[data-view="catalog"]'));
    assert.deepEqual(names(), ['Easy Lasagna', 'Roast Trout', 'Recipe 3', 'Recipe 4', 'Recipe 5']);
    assert.match($('header.section-title').textContent, /Page 1 of 2/);
    await click($('header.section-title a.pager'));
    assert.deepEqual(names(), ['Recipe 6', 'Recipe 7']);
    assert.match($('header.section-title').textContent, /Page 2 of 2/);
});

test('guests see the comments of a recipe but no form', async () => {
    await click($('[data-view="catalog"]'));
    await click(preview$('Roast Trout'));
    assert.equal($('main h2').textContent, 'Roast Trout');
    assert.deepEqual(comment$(), ['Tasty!']);
    assert.equal($('.comments form'), null);
});

test('logged-in users add a comment', async () => {
    await click($('[data-view="login"]'));
    submit($('main form'), { email: 'peter@abv.bg', password: '1' });
    await settle();
    assert.equal($('#user').style.display, 'inline-block');

    await click(preview$('Recipe 7'));
    assert.deepEqual(comment$(), ['No comments yet.']);
    submit($('.comments form'), { content: 'Great recipe' });
    await settle();
    assert.deepEqual(fetch.calls.at(-2).body, { recipeId: 'r7', content: 'Great recipe' });
    assert.deepEqual(comment$(), ['Great recipe']);
});

test('create, edit and delete a recipe', async () => {
    await click($('[data-view="create"]'));
    submit($('main form'), { name: 'Soup', img: 'soup.jpg', ingredients: 'water', steps: 'boil' });
    await settle();
    assert.equal($('main h2').textContent, 'Soup');

    await click($('[data-view="catalog"]'));
    await click(preview$('Easy Lasagna'));
    await click($('.controls a'));
    submit($('main form'), { name: 'Lasagna Deluxe' });
    await settle();
    assert.equal($('main h2').textContent, 'Lasagna Deluxe');

    await click($$('.controls a').at(-1));
    assert.equal(names()[0], 'Roast Trout');
});

test('logout and the title link return to home', async () => {
    await click($('#logoutBtn'));
    assert.equal($('#guest').style.display, 'inline-block');
    await click($('[data-view="catalog"]'));
    await click($('h1 a'));
    assert.match($('.hero').textContent, /Welcome/);
});
