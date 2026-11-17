import { Component, computed, inject, input, signal } from '@angular/core';
import { NewTask } from './new-task/new-task';
import { Task } from './task/task';
import { NewTaskData, TasksService } from './tasks.service';

@Component({
  selector: 'app-tasks',
  imports: [Task, NewTask],
  template: `
    <section>
      <h2>Tasks for {{ name() }}</h2>
      @if (adding()) {
        <app-new-task (add)="add($event)" (cancel)="adding.set(false)" />
      } @else {
        <button (click)="adding.set(true)">Add task</button>
      }
      @for (task of tasks(); track task.id) {
        <app-task [task]="task" (complete)="service.complete($event)" />
      } @empty {
        <p>No tasks yet.</p>
      }
    </section>
  `,
})
export class Tasks {
  protected readonly service = inject(TasksService);
  readonly userId = input.required<string>();
  readonly name = input.required<string>();
  readonly adding = signal(false);
  readonly tasks = computed(() => this.service.forUser(this.userId())());

  add(data: NewTaskData) {
    this.service.add(this.userId(), data);
    this.adding.set(false);
  }
}
