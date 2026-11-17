import { ErrorHandler, Injectable, signal } from '@angular/core';

// replaces Angular's default handler so uncaught errors also show up in the UI, not only the console
@Injectable({ providedIn: 'root' })
export class ErrorLog implements ErrorHandler {
  readonly last = signal<string | null>(null);

  handleError(error: unknown) {
    console.error(error);
    this.last.set(error instanceof Error ? error.message : String(error));
  }
}
