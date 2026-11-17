import { Routes } from '@angular/router';
import { About, Home, NotePage } from './pages';

export const routes: Routes = [
  { path: '', component: Home, title: 'Notes' },
  { path: 'about', component: About, title: 'About | Notes' },
  { path: 'notes/:id', component: NotePage, title: 'Note | Notes' },
  { path: '**', redirectTo: '' },
];
