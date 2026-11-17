import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./catalog/catalog').then((m) => m.Catalog) },
  // the whole admin area (routes, service, component) is fetched on first visit
  { path: 'admin', loadChildren: () => import('./admin/admin.routes') },
];
