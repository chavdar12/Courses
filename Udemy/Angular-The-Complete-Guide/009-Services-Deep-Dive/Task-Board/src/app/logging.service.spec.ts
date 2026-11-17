import { LoggingService } from './logging.service';

it('LoggingService timestamps entries', () => {
  const logger = new LoggingService();
  logger.log('hello');
  expect(logger.entries[0]).toMatch(/^\[\d{4}-\d\d-\d\dT.*\] hello$/);
});
