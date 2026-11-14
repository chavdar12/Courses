import { before, test } from 'node:test';
import assert from 'node:assert/strict';
import { click as userClick, loadPage, mockFetch, reply, settle, submit } from '../test-utils/dom.mjs';

// page.js is a singleton bound to one window, so the whole file walks through one session.
const make = (n, owner = 'u2') =>
    ({ _id: `g${n}`, _ownerId: owner, title: `Game ${n}`, category: `Cat ${n}`, maxLevel: '10', imageUrl: `/${n}.jpg`, summary: `About ${n}` });
let games = [make(4), make(3), make(2), make(1)];
const comments = [];
const fetch = mockFetch({
    'GET /data/games?sortBy=_createdOn%20desc': () => games,
    'GET /data/games?sortBy=_createdOn%20desc&distinct=category': () => games,
    ...Object.fromEntries([1, 2, 3, 4, 5].flatMap((n) => [
        [`GET /data/games/g${n}`, () => games.find((g) => g._id === `g${n}`)],
        [`GET /data/comments?where=gameId%3D%22g${n}%22`, () => comments.filter((c) => c.gameId === `g${n}`)]
    ])),
    'POST /data/games': (body) => {
        games = [{ ...body, _id: 'g5', _ownerId: 'u1' }, ...games];
        return games[0];
    },
    'PUT /data/games/g5': (body) => Object.assign(games[0], body),
    'DELETE /data/games/g5': () => {
        games = games.filter((g) => g._id !== 'g5');
        return { _deletedOn: 1 };
    },
    'POST /data/comments': (body) => comments.push(body) && body,
    'POST /users/register': reply(409, { message: 'A user with the same email already exists' }),
    'POST /users/login': (body) => ({ ...body, _id: 'u1', accessToken: 'tok' }),
    'GET /users/logout': reply(204)
});
let ctx;

const $ = (selector) => ctx.document.querySelector(selector);
const $$ = (selector) => [...ctx.document.querySelectorAll(selector)];
const go = async (selector) => {
    userClick($(selector));
    await settle();
};
const path = () => ctx.window.location.pathname;
const lastCall = (method) => fetch.calls.findLast((c) => c.method === method);

before(async () => {
    ctx = await loadPage(new URL('./index.html', import.meta.url), { fetch });
});

test('home shows the three most recent games for guests', () => {
    assert.equal($('#user').style.display, 'none');
    assert.deepEqual($$('.game h3').map((h) => h.textContent), ['Game 4', 'Game 3', 'Game 2']);
});

test('catalog lists all games with title and category', async () => {
    await go('nav a[href="/catalog"]');
    assert.deepEqual($$('.allGames h2').map((h) => h.textContent), ['Game 4', 'Game 3', 'Game 2', 'Game 1']);
    assert.equal($('.allGames h6').textContent, 'Cat 4');
});

test('guests see comments but cannot comment or edit', async () => {
    await go('a[href="/details/g1"]');
    assert.equal($('.game-header h1').textContent, 'Game 1');
    assert.equal($('.no-comment').textContent, 'No comments.');
    assert.equal($('.create-comment'), null);
    assert.equal($('.buttons'), null);
});

test('register validates, login returns home', async () => {
    await go('a[href="/register"]');
    submit($('main form'), { email: 'peter@abv.bg', password: '1', 'confirm-password': '2' });
    submit($('main form'), { 'confirm-password': '1' });
    await settle();
    assert.deepEqual(ctx.alerts, ['Passwords don\'t match!', 'A user with the same email already exists']);

    await go('a[href="/login"]');
    submit($('main form'), { email: 'peter@abv.bg', password: '123456' });
    await settle();
    assert.deepEqual(lastCall('POST').body, { email: 'peter@abv.bg', password: '123456' });
    assert.equal(path(), '/');
    assert.equal($('#user').style.display, '');
});

test('logged-in users comment on other games', async () => {
    await go('nav a[href="/catalog"]');
    await go('a[href="/details/g1"]');
    submit($('.create-comment form'), { comment: 'Nice game!' });
    await settle();
    assert.deepEqual(lastCall('POST').body, { gameId: 'g1', comment: 'Nice game!' });
    assert.deepEqual($$('.comment p').map((p) => p.textContent), ['Content: Nice game!']);
});

test('create checks empty fields and posts the game', async () => {
    await go('a[href="/create"]');
    const values = { title: 'Zelda', category: 'Adventure', maxLevel: '', imageUrl: '/z.jpg', summary: 'Hero' };
    submit($('main form'), values);
    await settle();
    assert.equal(ctx.alerts.at(-1), 'All fields are required!');

    submit($('main form'), { maxLevel: '70' });
    await settle();
    assert.deepEqual(lastCall('POST').body, { ...values, maxLevel: '70' });
    assert.equal(path(), '/');
    assert.equal($('.game h3').textContent, 'Zelda');
});

test('owners edit and delete their games but cannot comment on them', async () => {
    await go('a[href="/details/g5"]');
    assert.equal($('.create-comment'), null);
    await go('a[href="/edit/g5"]');
    assert.equal($('input[name="title"]').value, 'Zelda');
    submit($('main form'), { title: 'Zelda II' });
    await settle();
    assert.equal(lastCall('PUT').body.title, 'Zelda II');
    assert.equal(path(), '/details/g5');
    assert.equal($('.game-header h1').textContent, 'Zelda II');

    userClick($$('.buttons a').at(-1));
    await settle();
    assert.equal(lastCall('DELETE').path, '/data/games/g5');
    assert.equal(path(), '/');
});

test('logout returns home as a guest', async () => {
    $('#logoutBtn').click();
    await settle();
    assert.equal(path(), '/');
    assert.equal($('#guest').style.display, '');
});
