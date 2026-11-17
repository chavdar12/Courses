import assert from 'node:assert/strict';
import { test } from 'node:test';
import { tickets } from './index.ts';

const input = [
  'Philadelphia|94.20|available',
  'New York City|95.99|available',
  'New York City|95.99|sold',
  'Boston|126.20|departed',
];

test('sorts by destination and keeps ties in order', () => {
  assert.deepEqual(
    tickets(input, 'destination').map((t) => `${t.destination}|${t.status}`),
    ['Boston|departed', 'New York City|available', 'New York City|sold', 'Philadelphia|available'],
  );
});

test('sorts by status', () => {
  assert.deepEqual(
    tickets(input, 'status').map((t) => t.status),
    ['available', 'available', 'departed', 'sold'],
  );
});

test('parses and sorts price numerically', () => {
  assert.deepEqual(
    tickets(['A|100|x', 'B|9.5|x'], 'price').map((t) => t.price),
    [9.5, 100],
  );
});
