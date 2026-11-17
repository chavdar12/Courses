import { Component, input, output } from '@angular/core';
import { Place } from './place.model';

@Component({
  selector: 'app-places-list',
  template: `
    <ul>
      @for (place of places(); track place.id) {
        <li>
          <button (click)="selectPlace.emit(place)">{{ place.title }}, {{ place.country }}</button>
        </li>
      }
    </ul>
  `,
})
export class PlacesList {
  readonly places = input.required<Place[]>();
  readonly selectPlace = output<Place>();
}
