import { InjectionToken } from '@angular/core';

export type TaskStatus = 'OPEN' | 'IN_PROGRESS' | 'DONE';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}

export interface StatusOption {
  value: TaskStatus;
  label: string;
}

// a custom token: a plain value (not a class) that components get through DI
export const TASK_STATUS_OPTIONS = new InjectionToken<StatusOption[]>('task-status-options');

export const taskStatusOptions: StatusOption[] = [
  { value: 'OPEN', label: 'Open' },
  { value: 'IN_PROGRESS', label: 'Working on it' },
  { value: 'DONE', label: 'Completed' },
];
