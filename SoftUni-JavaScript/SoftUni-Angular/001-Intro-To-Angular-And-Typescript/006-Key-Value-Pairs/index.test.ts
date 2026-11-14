import assert from 'node:assert/strict';
import { test } from 'node:test';
import { KeyValuePair } from './index.ts';

test('displays the stored key and value', (t) => {
  const log = t.mock.method(console, 'log', () => {});
  const kvp = new KeyValuePair<number, string>();
  kvp.setKeyValue(1, 'Steve');
  kvp.display();

  assert.equal(log.mock.calls[0].arguments[0], 'key = 1, value = Steve');
});
