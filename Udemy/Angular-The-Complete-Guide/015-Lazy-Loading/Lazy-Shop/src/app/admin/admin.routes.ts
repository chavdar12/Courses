import { Routes } from '@angular/router';
import { StatsService } from './stats.service';

export default [
  {
    path: '',
    providers: [StatsService],
    children: [{ path: '', loadComponent: () => import('./dashboard').then((m) => m.Dashboard) }],
  },
] satisfies Routes;
