import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoggingService {
  readonly entries: string[] = [];

  log(message: string) {
    this.entries.push(`[${new Date().toISOString()}] ${message}`);
  }
}
