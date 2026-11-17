import { TestBed } from '@angular/core/testing';
import { TasksService } from './tasks.service';

const data = { title: 'Write tests', summary: 'For every component', dueDate: '2026-12-01' };

describe('TasksService', () => {
  beforeEach(() => localStorage.clear());

  it('adds tasks per user and persists them', () => {
    const service = TestBed.inject(TasksService);
    service.add('u1', data);
    service.add('u2', { ...data, title: 'Other' });

    expect(
      service
        .forUser('u1')()
        .map((t) => t.title),
    ).toEqual(['Write tests']);
    expect(JSON.parse(localStorage.getItem('tasks')!)).toHaveLength(2);
  });

  it('removes completed tasks', () => {
    const service = TestBed.inject(TasksService);
    service.add('u1', data);
    service.complete(service.all()[0].id);
    expect(service.all()).toEqual([]);
  });

  it('starts empty when storage holds garbage', () => {
    localStorage.setItem('tasks', '{not json');
    expect(TestBed.inject(TasksService).all()).toEqual([]);
  });
});
