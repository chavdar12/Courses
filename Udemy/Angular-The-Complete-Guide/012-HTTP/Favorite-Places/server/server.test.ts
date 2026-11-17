import assert from 'node:assert/strict';
import type { AddressInfo } from 'node:net';
import { after, before, beforeEach, test } from 'node:test';
import { reset, server } from './server.ts';

let base = '';
before(
  () =>
    new Promise<void>((done) =>
      server.listen(0, () => {
        base = `http://localhost:${(server.address() as AddressInfo).port}/api`;
        done();
      }),
    ),
);
after(() => new Promise<void>((done) => server.close(() => done())));
beforeEach(reset);

const put = (body: string) =>
  fetch(`${base}/user-places`, {
    method: 'PUT',
    body,
    headers: { 'content-type': 'application/json' },
  });

test('lists all places', async () => {
  const { places } = await (await fetch(`${base}/places`)).json();
  assert.equal(places.length, 4);
});

test('adds a place once and removes it', async () => {
  await put(JSON.stringify({ placeId: 'p2' }));
  const added = await (await put(JSON.stringify({ placeId: 'p2' }))).json();
  assert.deepEqual(
    added.places.map((p: { id: string }) => p.id),
    ['p2'],
  );
  const removed = await (await fetch(`${base}/user-places/p2`, { method: 'DELETE' })).json();
  assert.deepEqual(removed.places, []);
});

test('rejects bad bodies and unknown places', async () => {
  assert.equal((await put('{nope')).status, 400);
  assert.equal((await put(JSON.stringify({ placeId: 'x' }))).status, 422);
  assert.equal((await fetch(`${base}/other`)).status, 404);
});
