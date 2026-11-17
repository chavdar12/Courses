import { Component } from '@angular/core';
import { TaskList } from './tasks/task-list';

@Component({
  selector: 'app-root',
  imports: [TaskList],
  template: `<h1>Task Board</h1>
    <app-task-list />`,
})
export class App {}
