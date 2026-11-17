import { inject } from '@angular/core';
import { CanMatchFn, ResolveFn, Routes } from '@angular/router';
import { DataService, Task } from './data.service';
import { Home, NotFound } from './pages';
import { confirmLeave, NewTask } from './tasks/new-task';
import { Tasks } from './tasks/tasks';
import { UserTasks } from './users/user-tasks';

// unknown user ids skip this route and fall through to the 404 page
const knownUser: CanMatchFn = (_route, segments) => !!inject(DataService).user(segments[1]?.path);

const userName: ResolveFn<string> = (route) =>
  inject(DataService).user(route.paramMap.get('userId')!)!.name;

const userTitle: ResolveFn<string> = (route) =>
  `${inject(DataService).user(route.paramMap.get('userId')!)!.name} | Team Tasks`;

const tasks: ResolveFn<Task[]> = (route) => {
  const order = route.queryParamMap.get('order') === 'asc' ? 'asc' : 'desc';
  return inject(DataService).tasksFor(route.parent!.paramMap.get('userId')!, order);
};

export const routes: Routes = [
  { path: '', component: Home, title: 'Team Tasks' },
  {
    path: 'users/:userId',
    component: UserTasks,
    canMatch: [knownUser],
    resolve: { userName },
    title: userTitle,
    children: [
      { path: '', redirectTo: 'tasks', pathMatch: 'full' },
      {
        path: 'tasks',
        component: Tasks,
        resolve: { tasks },
        runGuardsAndResolvers: 'paramsOrQueryParamsChange',
      },
      { path: 'tasks/new', component: NewTask, canDeactivate: [confirmLeave] },
    ],
  },
  { path: '**', component: NotFound, title: 'Not found' },
];
