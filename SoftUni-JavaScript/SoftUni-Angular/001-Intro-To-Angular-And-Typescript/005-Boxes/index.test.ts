import assert from 'node:assert/strict';
import { test } from 'node:test';
import { Box } from './index.ts';

test('box counts added items and removes the last one', () => {
  const box = new Box<string>();
  box.add('Pesho');
  box.add('Gosho');

  assert.equal(box.count, 2);
  assert.equal(box.remove(), 'Gosho');
  assert.equal(box.count, 1);
});

test('removing from an empty box returns undefined', () => {
  assert.equal(new Box<number>().remove(), undefined);
});
