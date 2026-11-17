import { Injectable, computed, signal } from '@angular/core';

export interface Task {
  id: string;
  userId: string;
  title: string;
  summary: string;
  dueDate: string;
}

export type NewTaskData = Pick<Task, 'title' | 'summary' | 'dueDate'>;

const STORAGE_KEY = 'tasks';

@Injectable({ providedIn: 'root' })
export class TasksService {
  private readonly tasks = signal<Task[]>(this.load());

  readonly all = this.tasks.asReadonly();

  forUser(userId: string) {
    return computed(() => this.tasks().filter((t) => t.userId === userId));
  }

  add(userId: string, data: NewTaskData) {
    this.tasks.update((tasks) => [{ id: crypto.randomUUID(), userId, ...data }, ...tasks]);
    this.save();
  }

  complete(id: string) {
    this.tasks.update((tasks) => tasks.filter((t) => t.id !== id));
    this.save();
  }

  private load(): Task[] {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
      return Array.isArray(stored) ? stored : [];
    } catch {
      // corrupt storage should not break the app
      return [];
    }
  }

  private save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.tasks()));
  }
}
