import { TestBed } from '@angular/core/testing';
import { ErrorLog } from './error-log';

it('ErrorLog keeps the last error message', () => {
  vi.spyOn(console, 'error').mockImplementation(() => {});
  const log = TestBed.inject(ErrorLog);
  log.handleError(new Error('boom'));
  expect(log.last()).toBe('boom');
  log.handleError('plain');
  expect(log.last()).toBe('plain');
  expect(console.error).toHaveBeenCalledTimes(2);
});
