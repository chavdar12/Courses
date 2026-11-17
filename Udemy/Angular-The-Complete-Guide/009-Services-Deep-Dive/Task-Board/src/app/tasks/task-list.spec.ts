import { TestBed } from '@angular/core/testing';
import { TaskList } from './task-list';
import { TasksService } from './tasks.service';

describe('TaskList', () => {
  it('uses the injected status options and filters by status', async () => {
    const fixture = TestBed.createComponent(TaskList);
    const list = fixture.componentInstance;
    list.title = '  ';
    list.add();
    list.title = 'A';
    list.add();
    list.title = 'B';
    list.add();
    const service = TestBed.inject(TasksService);
    expect(service.all()).toHaveLength(2);
    service.setStatus(service.all()[1].id, 'DONE');

    list.filter.set('DONE');
    await fixture.whenStable();
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelectorAll('li')).toHaveLength(1);
    expect(el.querySelector('li')?.textContent).toContain('B');
    expect(el.querySelector('li option:last-child')?.textContent).toBe('Completed');
  });
});
