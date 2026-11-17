import { Component, inject } from '@angular/core';
import { ErrorService } from './error.service';
import { AvailablePlaces } from './places/available-places';
import { UserPlaces } from './places/user-places';

@Component({
  selector: 'app-root',
  imports: [AvailablePlaces, UserPlaces],
  template: `
    <h1>Favorite Places</h1>
    @if (errors.message()) {
      <div role="alert">
        {{ errors.message() }}
        <button (click)="errors.clear()">Dismiss</button>
      </div>
    }
    <app-user-places />
    <app-available-places />
  `,
})
export class App {
  protected readonly errors = inject(ErrorService);
}
