import { TestBed } from '@angular/core/testing';
import { DataService } from './data.service';

it('DataService sorts tasks by due date and adds new ones', () => {
  const data = TestBed.inject(DataService);
  expect(data.tasksFor('u1', 'asc').map((t) => t.id)).toEqual(['t2', 't1']);
  expect(data.tasksFor('u1').map((t) => t.id)).toEqual(['t1', 't2']);
  data.add('u2', 'New', '2027-01-01');
  expect(data.tasksFor('u2')).toHaveLength(1);
  expect(data.user('zz')).toBeUndefined();
});
