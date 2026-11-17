import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TASK_STATUS_OPTIONS, TaskStatus, taskStatusOptions } from './task.model';
import { TasksService } from './tasks.service';

@Component({
  selector: 'app-task-list',
  imports: [FormsModule],
  // element-level provider: only this component tree gets these options
  providers: [{ provide: TASK_STATUS_OPTIONS, useValue: taskStatusOptions }],
  template: `
    <form (ngSubmit)="add()">
      <input name="title" placeholder="Title" [(ngModel)]="title" />
      <input name="description" placeholder="Description" [(ngModel)]="description" />
      <button type="submit">Add</button>
    </form>
    <label>
      Filter
      <select [ngModel]="filter()" (ngModelChange)="filter.set($event)" name="filter">
        <option value="all">All</option>
        @for (o of options; track o.value) {
          <option [value]="o.value">{{ o.label }}</option>
        }
      </select>
    </label>
    <ul>
      @for (task of visible(); track task.id) {
        <li>
          {{ task.title }}
          <select
            [ngModel]="task.status"
            (ngModelChange)="tasks.setStatus(task.id, $event)"
            [name]="task.id"
          >
            @for (o of options; track o.value) {
              <option [value]="o.value">{{ o.label }}</option>
            }
          </select>
        </li>
      }
    </ul>
  `,
})
export class TaskList {
  protected readonly tasks = inject(TasksService);
  protected readonly options = inject(TASK_STATUS_OPTIONS);
  readonly filter = signal<TaskStatus | 'all'>('all');
  readonly visible = computed(() =>
    this.filter() === 'all'
      ? this.tasks.all()
      : this.tasks.all().filter((t) => t.status === this.filter()),
  );
  title = '';
  description = '';

  add() {
    if (!this.title.trim()) return;
    this.tasks.add(this.title.trim(), this.description.trim());
    this.title = this.description = '';
  }
}
