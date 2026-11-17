import { TestBed } from '@angular/core/testing';
import { LoggingService } from '../logging.service';
import { TasksService } from './tasks.service';

it('TasksService changes tasks and logs every change', () => {
  const service = TestBed.inject(TasksService);
  const logger = TestBed.inject(LoggingService);
  service.add('Deploy', 'to prod');
  service.setStatus(service.all()[0].id, 'DONE');
  expect(service.all()[0].status).toBe('DONE');
  expect(logger.entries).toHaveLength(2);
  expect(logger.entries[0]).toContain('added task "Deploy"');
});
