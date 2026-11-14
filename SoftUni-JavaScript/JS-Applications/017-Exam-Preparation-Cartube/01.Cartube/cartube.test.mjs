import { before, test } from 'node:test';
import assert from 'node:assert/strict';
import { click as userClick, loadPage, mockFetch, reply, settle, submit } from '../test-utils/dom.mjs';

// page.js is a singleton bound to one window, so the whole file walks through one session.
const audi = { _id: 'c1', _ownerId: 'u2', brand: 'Audi', model: 'A3', description: 'Clean', year: 2018, imageUrl: '/a.jpg', price: 25000 };
let cars = [audi];
const car = (id) => () => cars.find((c) => c._id === id);
const fetch = mockFetch({
    'GET /data/cars?sortBy=_createdOn%20desc': () => cars,
    'GET /data/cars?where=_ownerId%3D%22u1%22&sortBy=_createdOn%20desc': () => cars.filter((c) => c._ownerId === 'u1'),
    'GET /data/cars?where=year%3D2018': () => cars.filter((c) => c.year === 2018),
    'GET /data/cars?where=year%3D1990': [],
    'GET /data/cars/c1': car('c1'),
    'GET /data/cars/c2': car('c2'),
    'POST /data/cars': (body) => {
        cars = [{ ...body, _id: 'c2', _ownerId: 'u1' }, ...cars];
        return cars[0];
    },
    'PUT /data/cars/c2': (body) => Object.assign(cars[0], body),
    'DELETE /data/cars/c2': () => {
        cars = cars.filter((c) => c._id !== 'c2');
        return { _deletedOn: 1 };
    },
    'POST /users/register': reply(409, { message: 'A user with the same username already exists' }),
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
const path = () => ctx.window.location.pathname + ctx.window.location.search;
const titles = () => $$('.listing h2').map((h) => h.textContent);
const lastCall = (method) => fetch.calls.findLast((c) => c.method === method);

before(async () => {
    ctx = await loadPage(new URL('./index.html', import.meta.url), { fetch });
});

test('guest navigation and home page', () => {
    assert.equal($('#guest').style.display, '');
    assert.equal($('#profile').style.display, 'none');
    assert.ok($('#intro a[href="/catalog"]'));
});

test('all listings and details without owner buttons', async () => {
    await go('nav a[href="/catalog"]');
    assert.deepEqual(titles(), ['Audi A3']);
    await go('a[href="/details/c1"]');
    assert.equal($('.description-para').textContent, 'Clean');
    assert.equal($('.listings-buttons'), null);
});

test('search filters by year', async () => {
    await go('nav a[href="/search"]');
    submit($('main form'), { search: '2018' });
    await settle();
    assert.equal(path(), '/search?query=2018');
    assert.deepEqual(titles(), ['Audi A3']);
    submit($('main form'), { search: '1990' });
    await settle();
    assert.equal($('.no-cars').textContent, 'No results.');
});

test('register validates, login stores the session', async () => {
    await go('a[href="/register"]');
    submit($('main form'), { username: 'Peter', password: '1', repeatPass: '2' });
    submit($('main form'), { repeatPass: '1' });
    await settle();
    assert.deepEqual(ctx.alerts, ['Passwords don\'t match!', 'A user with the same username already exists']);

    await go('a[href="/login"]');
    submit($('main form'), { username: 'Peter', password: '123456' });
    await settle();
    assert.deepEqual(lastCall('POST').body, { username: 'Peter', password: '123456' });
    assert.equal(path(), '/catalog');
    assert.equal($('#welcome').textContent, 'Welcome Peter');
});

test('my listings is empty before creating', async () => {
    await go('a[href="/my-listings"]');
    assert.equal($('.no-cars').textContent, 'You haven\'t listed any cars yet.');
});

test('create validates numbers and posts the listing', async () => {
    await go('a[href="/create"]');
    const values = { brand: 'BMW', model: 'M3', description: 'Fast', year: '2020', imageUrl: '/b.jpg', price: '-1' };
    submit($('main form'), values);
    await settle();
    assert.equal(ctx.alerts.at(-1), 'Year and price must be positive numbers!');

    submit($('main form'), { price: '50000' });
    await settle();
    const post = lastCall('POST');
    assert.equal(post.headers['x-authorization'], 'tok');
    assert.deepEqual(post.body, { ...values, year: 2020, price: 50000 });
    assert.equal(path(), '/catalog');
    assert.deepEqual(titles(), ['BMW M3', 'Audi A3']);
});

test('owner edits and deletes the listing', async () => {
    await go('a[href="/my-listings"]');
    await go('a[href="/details/c2"]');
    await go('a[href="/edit/c2"]');
    assert.equal($('input[name="model"]').value, 'M3');
    submit($('main form'), { model: 'M5' });
    await settle();
    assert.equal(lastCall('PUT').body.model, 'M5');
    assert.equal(path(), '/details/c2');

    userClick($$('.listings-buttons a').at(-1));
    await settle();
    assert.equal(lastCall('DELETE').path, '/data/cars/c2');
    assert.deepEqual(titles(), ['Audi A3']);
});

test('logout returns home as a guest', async () => {
    $('#logoutBtn').click();
    await settle();
    assert.equal(path(), '/');
    assert.equal($('#profile').style.display, 'none');
});
