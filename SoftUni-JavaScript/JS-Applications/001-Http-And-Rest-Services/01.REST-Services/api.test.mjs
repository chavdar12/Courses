import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mockFetch, reply } from '../test-utils/dom.mjs';
import { createIssue, getCountry, getIssue } from './api.js';

test('getCountry asks REST Countries by name', async () => {
    globalThis.fetch = mockFetch({
        'GET /v2/name/Bulgaria': [{ name: 'Bulgaria', capital: 'Sofia' }],
    });
    assert.equal((await getCountry('Bulgaria'))[0].capital, 'Sofia');
});

test('getIssue reads one issue and reports API errors', async () => {
    globalThis.fetch = mockFetch({
        'GET /repos/testnakov/test-nakov-repo/issues/1': { number: 1, labels: [{ name: 'bug' }] },
        'GET /repos/testnakov/test-nakov-repo/issues/0': reply(404, { message: 'Not Found' }),
    });
    assert.equal((await getIssue(1)).labels[0].name, 'bug');
    await assert.rejects(getIssue(0), /404 Not Found/);
});

test('createIssue posts JSON with basic auth', async () => {
    globalThis.fetch = mockFetch({
        'POST /repos/testnakov/test-nakov-repo/issues': (body) => ({ number: 7, ...body }),
    });
    const issue = await createIssue(
        { username: 'peter', token: 'secret' },
        { title: 'Bug', body: 'Broken' },
    );

    const [call] = globalThis.fetch.calls;
    assert.equal(call.headers.authorization, `Basic ${btoa('peter:secret')}`);
    assert.deepEqual(call.body, { title: 'Bug', body: 'Broken' });
    assert.equal(issue.number, 7);
});
