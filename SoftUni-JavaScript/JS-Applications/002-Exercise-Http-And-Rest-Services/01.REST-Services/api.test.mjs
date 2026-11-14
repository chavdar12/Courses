import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mockFetch, reply } from '../test-utils/dom.mjs';
import * as api from './api.js';

test('REST Countries: name, selected fields and language filter', async () => {
    globalThis.fetch = mockFetch({
        'GET /v2/name/Bulgaria': [{ name: 'Bulgaria' }],
        'GET /v2/name/Italy?fields=name,capital,region,population': [{ name: 'Italy', capital: 'Rome' }],
        'GET /v2/lang/de?fields=name,region': [{ name: 'Austria', region: 'Europe' }]
    });
    assert.equal((await api.getCountry('Bulgaria'))[0].name, 'Bulgaria');
    assert.equal((await api.getCountryFields('Italy', ['name', 'capital', 'region', 'population']))[0].capital, 'Rome');
    assert.equal((await api.getCountriesByLanguage('de', ['name', 'region']))[0].name, 'Austria');
});

test('bus stop and phonebook use the local server', async () => {
    globalThis.fetch = mockFetch({
        'GET /jsonstore/bus/businfo/1287': { name: 'Bus Stop', buses: { 4: 5 } },
        'GET /jsonstore/bus/businfo/0': reply(404, {}),
        'GET /jsonstore/phonebook': { p1: { person: 'Maya', phone: '123' } },
        'POST /jsonstore/phonebook': (body) => ({ ...body, _id: 'p2' })
    });
    assert.deepEqual((await api.getBusStop(1287)).buses, { 4: 5 });
    await assert.rejects(api.getBusStop(0), /HTTP 404/);
    assert.equal((await api.getPhonebook()).p1.person, 'Maya');
    assert.deepEqual(await api.addPhone('Peter', '555'), { person: 'Peter', phone: '555', _id: 'p2' });
});

test('employees support all five request types', async () => {
    globalThis.fetch = mockFetch({
        'GET /api/v1/employees': { data: [] },
        'GET /api/v1/employee/1': { data: { id: 1 } },
        'POST /api/v1/create': (body) => ({ data: body }),
        'PUT /api/v1/update/21': (body) => ({ data: body }),
        'DELETE /api/v1/delete/2': { message: 'deleted' }
    });
    await api.employees.getAll();
    await api.employees.getOne(1);
    await api.employees.create({ name: 'test' });
    await api.employees.update(21, { name: 'new' });
    await api.employees.remove(2);
    assert.deepEqual(globalThis.fetch.calls.map((c) => c.method), ['GET', 'GET', 'POST', 'PUT', 'DELETE']);
});

test('cloud collections build the right URLs and headers', async () => {
    globalThis.fetch = mockFetch({
        'POST /books.json': { name: 'b1' },
        'DELETE /books/b1.json': null,
        'GET /app/key/data/Music': [],
        'GET /classes/Students': { results: [] }
    });
    assert.equal((await api.firebase('https://x.firebaseio.com').create({ title: 'Gone Girl' })).name, 'b1');
    await api.firebase('https://x.firebaseio.com').remove('b1');
    await api.backendless('app', 'key').getAll();
    await api.back4app('app', 'key').getAll();
    const parse = globalThis.fetch.calls.at(-1);
    assert.equal(parse.headers['x-parse-application-id'], 'app');
    assert.equal(parse.headers['x-parse-rest-api-key'], 'key');
});
