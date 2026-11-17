import { Injectable, signal } from '@angular/core';

export interface User {
  id: string;
  name: string;
}

export interface Task {
  id: string;
  userId: string;
  title: string;
  dueDate: string;
}

@Injectable({ providedIn: 'root' })
export class DataService {
  readonly users: User[] = [
    { id: 'u1', name: 'Ana' },
    { id: 'u2', name: 'Boris' },
  ];
  private readonly tasks = signal<Task[]>([
    { id: 't1', userId: 'u1', title: 'Write the docs', dueDate: '2026-12-01' },
    { id: 't2', userId: 'u1', title: 'Fix the login bug', dueDate: '2026-11-20' },
  ]);

  user(id: string) {
    return this.users.find((u) => u.id === id);
  }

  tasksFor(userId: string, order: 'asc' | 'desc' = 'desc') {
    const sorted = this.tasks()
      .filter((t) => t.userId === userId)
      .sort((a, b) => a.dueDate.localeCompare(b.dueDate));
    return order === 'asc' ? sorted : sorted.reverse();
  }

  add(userId: string, title: string, dueDate: string) {
    this.tasks.update((t) => [...t, { id: crypto.randomUUID(), userId, title, dueDate }]);
  }
}
