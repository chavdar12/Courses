import { Component, OnInit, inject, signal } from '@angular/core';
import { Place } from './place.model';
import { PlacesList } from './places-list';
import { PlacesService } from './places.service';

@Component({
  selector: 'app-user-places',
  imports: [PlacesList],
  template: `
    <h2>My favorites</h2>
    @if (loading()) {
      <p>Loading favorites…</p>
    } @else if (service.loadedUserPlaces().length === 0) {
      <p>Pick places you like from the list below.</p>
    } @else {
      <app-places-list [places]="service.loadedUserPlaces()" (selectPlace)="remove($event)" />
    }
  `,
})
export class UserPlaces implements OnInit {
  protected readonly service = inject(PlacesService);
  readonly loading = signal(true);

  ngOnInit() {
    this.service.loadUserPlaces().subscribe({
      complete: () => this.loading.set(false),
      error: () => this.loading.set(false),
    });
  }

  remove(place: Place) {
    this.service.removePlace(place).subscribe({ error: () => {} });
  }
}
