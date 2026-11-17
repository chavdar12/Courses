import { test, beforeEach } from 'node:test';
import assert from 'node:assert/strict';

let calls;
let session;
globalThis.sessionStorage = { getItem: (key) => session[key] ?? null };
globalThis.fetch = async (url, options = {}) => {
    calls.push({ url, ...options });
    return { ok: true, json: async () => ({ url }) };
};

const { requests } = await import('./api/requests.js');
const { userInfo } = await import('./util/userInfo.js');

const base = 'http://localhost:3030';

beforeEach(() => {
    calls = [];
    session = { 'game-user': JSON.stringify({ accessToken: 'token-1' }) };
});

test('userInfo reads the token from sessionStorage', () => {
    assert.equal(userInfo.getToken(), 'token-1');
    session = {};
    assert.equal(userInfo.getUserObj(), null);
    assert.equal(userInfo.getToken(), null);
});

test('login posts the credentials', async () => {
    await requests.user.login('a@b.bg', '123');
    assert.equal(calls[0].url, `${base}/users/login`);
    assert.equal(calls[0].method, 'POST');
    assert.deepEqual(JSON.parse(calls[0].body), { email: 'a@b.bg', password: '123' });
});

test('register posts the user object', async () => {
    await requests.user.register({ email: 'a@b.bg', password: '123' });
    assert.equal(calls[0].url, `${base}/users/register`);
    assert.equal(calls[0].method, 'POST');
});

test('logout sends the auth token', async () => {
    await requests.user.logout();
    assert.equal(calls[0].url, `${base}/users/logout`);
    assert.equal(calls[0].headers['X-Authorization'], 'token-1');
});

test('games read endpoints sort by newest and parse json', async () => {
    assert.deepEqual(await requests.games.getAll(), {
        url: `${base}/data/games?sortBy=_createdOn%20desc`,
    });
    await requests.games.getMostResently();
    assert.match(calls[1].url, /distinct=category$/);
    assert.deepEqual(await requests.games.getById('7'), { url: `${base}/data/games/7` });
});

test('games write endpoints are authorized', async () => {
    await requests.games.create({ title: 'T' });
    await requests.games.edit({ title: 'U' }, '7');
    await requests.games.deleteById('7');
    assert.deepEqual(
        calls.map((c) => [c.method, c.url]),
        [
            ['POST', `${base}/data/games`],
            ['PUT', `${base}/data/games/7`],
            ['DELETE', `${base}/data/games/7`],
        ],
    );
    assert.ok(calls.every((c) => c.headers['X-Authorization'] === 'token-1'));
});

test('comments are filtered by game and posted with the token', async () => {
    await requests.comments.getAll('42');
    assert.equal(calls[0].url, `${base}/data/comments?where=gameId%3D%2242%22`);
    await requests.comments.postNew({ gameId: '42', comment: 'hi' });
    assert.equal(calls[1].method, 'POST');
    assert.equal(calls[1].headers['X-Authorization'], 'token-1');
});
