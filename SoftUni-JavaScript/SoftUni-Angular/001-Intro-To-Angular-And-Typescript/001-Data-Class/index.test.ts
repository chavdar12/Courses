import assert from 'node:assert/strict';
import { test } from 'node:test';
import { Request } from './index.ts';

test('Request starts unfulfilled with no response', () => {
  const request = new Request('GET', 'http://google.com', 'HTTP/1.1', '');

  assert.deepEqual(
    { ...request },
    {
      method: 'GET',
      uri: 'http://google.com',
      version: 'HTTP/1.1',
      message: '',
      response: undefined,
      fulfilled: false,
    },
  );
});
