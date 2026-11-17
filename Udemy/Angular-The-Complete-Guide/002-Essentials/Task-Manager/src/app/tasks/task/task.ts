import { DatePipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { Task as TaskModel } from '../tasks.service';

@Component({
  selector: 'app-task',
  imports: [DatePipe],
  template: `
    <article>
      <h3>{{ task().title }}</h3>
      <time>{{ task().dueDate | date: 'fullDate' }}</time>
      <p>{{ task().summary }}</p>
      <button (click)="complete.emit(task().id)">Complete</button>
    </article>
  `,
})
export class Task {
  readonly task = input.required<TaskModel>();
  readonly complete = output<string>();
}
