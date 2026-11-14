import { before, test } from 'node:test';
import assert from 'node:assert/strict';
import { click as userClick, loadPage, mockFetch, settle, submit } from '../test-utils/dom.mjs';

// page.js is a singleton bound to one window, so the whole file walks through one session.
const users = { u1: { username: 'Peter' }, u2: { username: 'George' }, u9: { username: 'Neo' } };
const teams = [
    { _id: 't1', _ownerId: 'u1', name: 'Storm Troopers', logoUrl: '/atat.png', description: 'These ARE the droids' },
    { _id: 't2', _ownerId: 'u2', name: 'Team Rocket', logoUrl: '/rocket.png', description: 'Gotta catch them all' }
];
let members = [
    { _id: 'm1', _ownerId: 'u1', teamId: 't1', status: 'member' },
    { _id: 'm2', _ownerId: 'u2', teamId: 't2', status: 'member' },
    { _id: 'm3', _ownerId: 'u1', teamId: 't2', status: 'member' }
];
let nextId = 10;
const q = (query) => encodeURIComponent(query);
const routes = {
    'GET /data/teams': () => teams,
    'POST /users/register': (body) => ({ ...body, _id: 'u9', accessToken: 'tok' }),
    'GET /users/logout': null,
    'POST /data/teams': (body) => {
        teams.push({ ...body, _id: 't9', _ownerId: 'u9' });
        return teams.at(-1);
    },
    'PUT /data/teams/t9': (body) => Object.assign(teams[2], body),
    'POST /data/members': (body) => {
        members.push({ ...body, _id: `m${nextId++}`, _ownerId: 'u9', status: 'pending' });
        return members.at(-1);
    },
    [`GET /data/members?where=${q('_ownerId="u9" AND status="member"')}&load=team%3DteamId%3Ateams`]: () =>
        members.filter((m) => m._ownerId === 'u9' && m.status === 'member').map((m) => ({ ...m, team: teams.find((t) => t._id === m.teamId) }))
};
for (const id of ['m10', 'm11', 'm12', 'm20', 'm3']) {
    routes[`PUT /data/members/${id}`] = (body) => Object.assign(members.find((m) => m._id === id), body);
    routes[`DELETE /data/members/${id}`] = () => {
        members = members.filter((m) => m._id !== id);
        return {};
    };
}
for (const id of ['t1', 't2', 't9']) {
    routes[`GET /data/teams/${id}`] = () => teams.find((t) => t._id === id);
    routes[`GET /data/members?where=${q(`teamId="${id}"`)}&load=user%3D_ownerId%3Ausers`] = () =>
        members.filter((m) => m.teamId === id).map((m) => ({ ...m, user: users[m._ownerId] }));
}
for (const ids of [['t1', 't2'], ['t9'], ['t1', 't2', 't9']]) {
    routes[`GET /data/members?where=${q(`teamId IN (${ids.map((i) => `"${i}"`).join(',')}) AND status="member"`)}`] = () =>
        members.filter((m) => ids.includes(m.teamId) && m.status === 'member');
}
const fetch = mockFetch(routes);
let ctx;

const $ = (selector) => ctx.document.querySelector(selector);
const $$ = (selector) => [...ctx.document.querySelectorAll(selector)];
const go = async (selector) => {
    userClick($(selector));
    await settle();
};
const button = (text) => $$('main button').find((b) => b.textContent.trim() === text);
const path = () => ctx.window.location.pathname;
const visible = (selector) => $$(selector).every((a) => a.style.display !== 'none');
const memberNames = () => $$('.member-list .name').map((s) => s.textContent);

before(async () => {
    ctx = await loadPage(new URL('./index.html', import.meta.url), { fetch });
});

test('guest sees the guest navbar and Sign Up Now', () => {
    assert.ok(visible('nav .guest'));
    assert.equal($('nav .user').style.display, 'none');
    assert.equal($('#home .action').textContent, 'Sign Up Now');
});

test('browse lists teams with member counts and no create button for guests', async () => {
    await go('nav a[href="/browse"]');
    assert.deepEqual($$('.tm-tile h2').map((h) => h.textContent), ['Storm Troopers', 'Team Rocket']);
    assert.deepEqual($$('.member-count').map((s) => s.textContent), ['1 Member', '2 Members']);
    assert.equal($('a[href="/create"]'), null);
});

test('guests see member names but no buttons on details', async () => {
    await go('a[href="/details/t2"]');
    assert.deepEqual(memberNames(), ['George', 'Peter']);
    assert.equal($$('main button').length, 0);
    assert.equal($('.pending-list'), null);
});

test('register validates and then signs the user in', async () => {
    await go('nav a[href="/register"]');
    submit($('main form'), { email: 'neo', username: 'Neo', password: '123', repass: '123' });
    await settle();
    assert.equal($('.error').textContent, 'Please enter a valid e-mail.');
    submit($('main form'), { email: 'neo@abv.bg', username: 'Ne' });
    await settle();
    assert.equal($('.error').textContent, 'Username must be at least 3 characters.');

    submit($('main form'), { email: 'neo@abv.bg', username: 'Neo', password: '123', repass: '123' });
    await settle();
    assert.deepEqual(fetch.calls.findLast((c) => c.path === '/users/register').body, { email: 'neo@abv.bg', username: 'Neo', password: '123' });
    assert.equal(path(), '/my-teams');
    assert.ok(visible('nav .user'));
    assert.ok($('.empty'));
    assert.ok($('a[href="/create"]'));
});

test('create validates, then adds the owner as an approved member', async () => {
    await go('a[href="/create"]');
    submit($('main form'), { name: 'Neo', logoUrl: '/n.png', description: 'The chosen ones' });
    await settle();
    assert.equal($('.error').textContent, 'Team name must be at least 4 characters.');

    submit($('main form'), { name: 'Zion' });
    await settle();
    const start = fetch.calls.findIndex((c) => c.method === 'POST' && c.path === '/data/teams');
    const calls = fetch.calls.slice(start).map((c) => `${c.method} ${c.path.split('?')[0]}`);
    assert.deepEqual(calls.slice(0, 3), ['POST /data/teams', 'POST /data/members', 'PUT /data/members/m10']);
    assert.deepEqual(fetch.calls.find((c) => c.method === 'PUT').body, { teamId: 't9', status: 'member' });
    assert.equal(path(), '/details/t9');
    assert.deepEqual(memberNames(), ['Neo']);
    assert.equal($('.member-list button'), null, 'owner cannot remove themself');
});

test('a user joins another team and cancels the request', async () => {
    await go('nav a[href="/browse"]');
    await go('a[href="/details/t2"]');
    button('Join team').click();
    await settle();
    assert.match($('.actions').textContent, /Membership pending/);

    button('Cancel request').click();
    await settle();
    assert.ok(button('Join team'));
});

test('the owner approves a request and removes a member', async () => {
    members.push({ _id: 'm20', _ownerId: 'u2', teamId: 't9', status: 'pending' });
    await go('nav a[href="/my-teams"]');
    await go('a[href="/details/t9"]');
    assert.equal($('.pending-list .name').textContent, 'George');

    button('Approve').click();
    await settle();
    assert.deepEqual(memberNames(), ['Neo', 'George']);

    button('Remove from team').click();
    await settle();
    assert.deepEqual(memberNames(), ['Neo']);
});

test('the owner edits the team', async () => {
    await go('a[href="/edit/t9"]');
    assert.equal($('input[name="name"]').value, 'Zion');
    submit($('main form'), { description: 'short' });
    await settle();
    assert.equal($('.error').textContent, 'Description must be at least 10 characters.');
    submit($('main form'), { description: 'The last human city' });
    await settle();
    assert.equal(path(), '/details/t9');
    assert.equal($('.team-info p').textContent, 'The last human city');
});

test('logout returns home as a guest', async () => {
    $('#logoutBtn').click();
    await settle();
    assert.equal(path(), '/');
    assert.equal(ctx.window.sessionStorage.getItem('userData'), null);
    assert.ok(visible('nav .guest'));
});
