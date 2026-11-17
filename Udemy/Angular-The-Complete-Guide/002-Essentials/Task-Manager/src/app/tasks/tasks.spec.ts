import { TestBed } from '@angular/core/testing';
import { Tasks } from './tasks';
import { TasksService } from './tasks.service';

describe('Tasks', () => {
  beforeEach(() => localStorage.clear());

  it('lists the user tasks, adds new ones and completes them', () => {
    const service = TestBed.inject(TasksService);
    service.add('u2', { title: 'Not mine', summary: '', dueDate: '2026-01-01' });
    const fixture = TestBed.createComponent(Tasks);
    fixture.componentRef.setInput('userId', 'u1');
    fixture.componentRef.setInput('name', 'Ana');
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('No tasks yet.');

    fixture.componentInstance.add({ title: 'Mine', summary: 's', dueDate: '2026-01-02' });
    fixture.detectChanges();
    expect(el.querySelectorAll('app-task')).toHaveLength(1);
    expect(el.textContent).not.toContain('Not mine');

    (el.querySelector('app-task button') as HTMLButtonElement).click();
    fixture.detectChanges();
    expect(el.textContent).toContain('No tasks yet.');
  });
});
