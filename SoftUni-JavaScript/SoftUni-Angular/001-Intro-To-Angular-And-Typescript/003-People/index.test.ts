import assert from 'node:assert/strict';
import { test } from 'node:test';
import { Junior, Manager, Senior } from './index.ts';

test('employees cycle through their tasks', (t) => {
  const log = t.mock.method(console, 'log', () => {});
  const senior = new Senior('Peter', 35);
  for (let i = 0; i < 4; i++) senior.work();

  assert.deepEqual(
    log.mock.calls.map((c) => c.arguments[0]),
    [
      'Peter is working on a complicated task.',
      'Peter is taking time off work.',
      'Peter is supervising junior workers.',
      'Peter is working on a complicated task.',
    ],
  );
});

test('junior has a single task', (t) => {
  const log = t.mock.method(console, 'log', () => {});
  new Junior('Ivan', 20).work();

  assert.equal(log.mock.calls[0].arguments[0], 'Ivan is working on a simple task.');
});

test('manager salary includes the dividend', (t) => {
  const log = t.mock.method(console, 'log', () => {});
  const manager = new Manager('Maria', 42);
  manager.salary = 3000;
  manager.dividend = 1500;
  manager.collectSalary();

  assert.equal(log.mock.calls[0].arguments[0], 'Maria received 4500 this month.');
});
