import assert from 'node:assert/strict';
import { test } from 'node:test';
import { Firemelon, Melolemonmelon, Watermelon } from './index.ts';

test('element index is weight times sort length', () => {
  assert.equal(new Firemelon(12.5, 'Kingsize').elementIndex, 100);
});

test('toString prints element, sort and index', () => {
  assert.equal(
    new Watermelon(12.5, 'Kingsize').toString(),
    'Element: Water\nSort: Kingsize\nElement Index: 100',
  );
});

test('melolemonmelon morphs through all elements and wraps', () => {
  const melon = new Melolemonmelon(10, 'Mixed');
  const seen = [];
  for (let i = 0; i < 5; i++) {
    seen.push(melon.toString().split('\n')[0]);
    melon.morph();
  }

  assert.deepEqual(seen, [
    'Element: Water',
    'Element: Fire',
    'Element: Earth',
    'Element: Air',
    'Element: Water',
  ]);
});
