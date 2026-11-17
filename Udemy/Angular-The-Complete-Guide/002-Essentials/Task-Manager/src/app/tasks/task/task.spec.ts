import { TestBed } from '@angular/core/testing';
import { Task } from './task';

describe('Task', () => {
  it('renders the task and emits its id on complete', () => {
    const fixture = TestBed.createComponent(Task);
    fixture.componentRef.setInput('task', {
      id: 't1',
      userId: 'u1',
      title: 'Plan',
      summary: 'Sprint plan',
      dueDate: '2026-12-24',
    });
    const done: string[] = [];
    fixture.componentInstance.complete.subscribe((id) => done.push(id));
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;

    expect(el.querySelector('h3')?.textContent).toBe('Plan');
    expect(el.querySelector('time')?.textContent).toContain('December 24, 2026');
    el.querySelector('button')!.click();
    expect(done).toEqual(['t1']);
  });
});
