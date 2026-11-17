import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Prerender },
  { path: 'about', renderMode: RenderMode.Prerender },
  // notes live in the visitor's browser storage, so the server cannot render them
  { path: 'notes/:id', renderMode: RenderMode.Client },
  { path: '**', renderMode: RenderMode.Server },
];
