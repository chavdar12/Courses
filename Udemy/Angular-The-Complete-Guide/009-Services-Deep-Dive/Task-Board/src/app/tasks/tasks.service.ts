import { Injectable, inject, signal } from '@angular/core';
import { LoggingService } from '../logging.service';
import { Task, TaskStatus } from './task.model';

@Injectable({ providedIn: 'root' })
export class TasksService {
  private readonly logger = inject(LoggingService); // a service injected into a service
  private readonly tasks = signal<Task[]>([]);
  readonly all = this.tasks.asReadonly();

  add(title: string, description: string) {
    this.tasks.update((t) => [
      ...t,
      { id: crypto.randomUUID(), title, description, status: 'OPEN' },
    ]);
    this.logger.log(`added task "${title}"`);
  }

  setStatus(id: string, status: TaskStatus) {
    this.tasks.update((t) => t.map((x) => (x.id === id ? { ...x, status } : x)));
    this.logger.log(`changed status of ${id} to ${status}`);
  }
}
