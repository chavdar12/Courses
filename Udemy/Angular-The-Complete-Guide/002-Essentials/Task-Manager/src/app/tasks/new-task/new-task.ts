import { Component, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NewTaskData } from '../tasks.service';

@Component({
  selector: 'app-new-task',
  imports: [FormsModule],
  template: `
    <form (ngSubmit)="submit()">
      <label>Title <input name="title" [(ngModel)]="title" required /></label>
      <label>Summary <textarea name="summary" [(ngModel)]="summary"></textarea></label>
      <label>Due date <input name="dueDate" type="date" [(ngModel)]="dueDate" required /></label>
      @if (error()) {
        <p role="alert">{{ error() }}</p>
      }
      <button type="button" (click)="cancel.emit()">Cancel</button>
      <button type="submit">Create</button>
    </form>
  `,
})
export class NewTask {
  readonly add = output<NewTaskData>();
  readonly cancel = output();

  title = '';
  summary = '';
  dueDate = '';
  readonly error = signal('');

  submit() {
    const title = this.title.trim();
    if (!title || !this.dueDate) {
      this.error.set('Title and due date are required.');
      return;
    }
    this.add.emit({ title, summary: this.summary.trim(), dueDate: this.dueDate });
  }
}
