import { Component, input } from '@angular/core';
import { Task } from '../data.service';

@Component({
  selector: 'app-tasks',
  template: `
    <ul>
      @for (task of tasks(); track task.id) {
        <li>{{ task.dueDate }} – {{ task.title }}</li>
      } @empty {
        <li>No tasks.</li>
      }
    </ul>
  `,
})
export class Tasks {
  readonly tasks = input.required<Task[]>(); // resolved data, re-run when the query params change
}
