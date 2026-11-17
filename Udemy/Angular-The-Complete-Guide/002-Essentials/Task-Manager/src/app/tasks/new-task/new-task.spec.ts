import { TestBed } from '@angular/core/testing';
import { NewTaskData } from '../tasks.service';
import { NewTask } from './new-task';

describe('NewTask', () => {
  it('rejects an empty title and emits trimmed data otherwise', () => {
    const fixture = TestBed.createComponent(NewTask);
    const form = fixture.componentInstance;
    const added: NewTaskData[] = [];
    form.add.subscribe((d) => added.push(d));

    form.title = '   ';
    form.dueDate = '2026-12-01';
    form.submit();
    fixture.detectChanges();
    expect(added).toEqual([]);
    expect(fixture.nativeElement.querySelector('[role=alert]').textContent).toContain('required');

    form.title = '  Ship it ';
    form.summary = ' now ';
    form.submit();
    expect(added).toEqual([{ title: 'Ship it', summary: 'now', dueDate: '2026-12-01' }]);
  });
});
