import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NotesService } from './notes.service';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  template: `
    <form (submit)="$event.preventDefault(); notes.add(text.value); text.value = ''">
      <input #text placeholder="New note" maxlength="500" />
      <button>Add</button>
    </form>
    <ul>
      @for (note of notes.all(); track note.id) {
        <li>
          <a [routerLink]="['/notes', note.id]">{{ note.text }}</a>
        </li>
      } @empty {
        <li>No notes yet.</li>
      }
    </ul>
  `,
})
export class Home {
  protected readonly notes = inject(NotesService);
}

@Component({
  selector: 'app-note',
  imports: [RouterLink],
  template: `
    @if (note(); as n) {
      <p class="note">{{ n.text }}</p>
    } @else {
      <p>Note not found.</p>
    }
    <a routerLink="/">Back</a>
  `,
})
export class NotePage {
  readonly id = input.required<string>(); // route param via component input binding
  private readonly notes = inject(NotesService);
  // derived with a signal instead of a route resolver
  readonly note = computed(() => this.notes.get(this.id()));
}

@Component({
  selector: 'app-about',
  template: `<p>Notes is prerendered at build time and hydrated in the browser.</p>`,
})
export class About {}
