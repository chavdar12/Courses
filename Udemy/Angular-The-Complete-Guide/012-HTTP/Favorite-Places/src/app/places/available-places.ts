import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { Place } from './place.model';
import { PlacesList } from './places-list';
import { PlacesService } from './places.service';

@Component({
  selector: 'app-available-places',
  imports: [PlacesList],
  template: `
    <h2>Available places</h2>
    @if (loading()) {
      <p>Loading places…</p>
    } @else if (error()) {
      <p class="error">{{ error() }}</p>
    } @else {
      <app-places-list [places]="places()" (selectPlace)="add($event)" />
    }
  `,
})
export class AvailablePlaces implements OnInit {
  private readonly service = inject(PlacesService);
  private readonly destroyRef = inject(DestroyRef);
  readonly places = signal<Place[]>([]);
  readonly loading = signal(false);
  readonly error = signal('');

  ngOnInit() {
    this.loading.set(true);
    const sub = this.service.loadAvailablePlaces().subscribe({
      next: (places) => this.places.set(places),
      error: (e: Error) => {
        this.error.set(e.message);
        this.loading.set(false);
      },
      complete: () => this.loading.set(false),
    });
    this.destroyRef.onDestroy(() => sub.unsubscribe());
  }

  add(place: Place) {
    this.service.addPlace(place).subscribe({ error: () => {} }); // ErrorService shows the error
  }
}
