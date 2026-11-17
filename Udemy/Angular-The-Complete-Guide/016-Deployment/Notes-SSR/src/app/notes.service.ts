import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export interface Note {
  id: string;
  text: string;
}

const KEY = 'notes';

@Injectable({ providedIn: 'root' })
export class NotesService {
  // the SSR fix: localStorage does not exist on the server, so only touch it in the browser
  private readonly browser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly notes = signal<Note[]>(this.load());
  readonly all = this.notes.asReadonly();

  get(id: string) {
    return this.notes().find((n) => n.id === id);
  }

  add(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;
    this.notes.update((n) => [...n, { id: crypto.randomUUID(), text: trimmed.slice(0, 500) }]);
    this.save();
  }

  private load(): Note[] {
    if (!this.browser) return [];
    try {
      const stored = JSON.parse(localStorage.getItem(KEY) ?? '[]');
      return Array.isArray(stored) ? stored : [];
    } catch {
      return [];
    }
  }

  private save() {
    if (this.browser) localStorage.setItem(KEY, JSON.stringify(this.notes()));
  }
}
