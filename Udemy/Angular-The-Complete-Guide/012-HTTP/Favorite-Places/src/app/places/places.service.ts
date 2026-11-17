import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { catchError, map, tap, throwError } from 'rxjs';
import { ErrorService } from '../error.service';
import { Place } from './place.model';

const API = '/api';

@Injectable({ providedIn: 'root' })
export class PlacesService {
  private readonly http = inject(HttpClient);
  private readonly errors = inject(ErrorService);
  private readonly userPlaces = signal<Place[]>([]);
  readonly loadedUserPlaces = this.userPlaces.asReadonly();

  loadAvailablePlaces() {
    return this.fetch(`${API}/places`, 'Could not load the places. Try again later.');
  }

  loadUserPlaces() {
    return this.fetch(`${API}/user-places`, 'Could not load your favorites.').pipe(
      tap((places) => this.userPlaces.set(places)),
    );
  }

  // optimistic: update the UI first, roll back if the server says no
  addPlace(place: Place) {
    const previous = this.userPlaces();
    if (!previous.some((p) => p.id === place.id)) this.userPlaces.set([...previous, place]);
    return this.http
      .put<{ places: Place[] }>(`${API}/user-places`, { placeId: place.id })
      .pipe(catchError(() => this.rollback(previous, 'Could not save the place.')));
  }

  removePlace(place: Place) {
    const previous = this.userPlaces();
    this.userPlaces.set(previous.filter((p) => p.id !== place.id));
    return this.http
      .delete<{ places: Place[] }>(`${API}/user-places/${encodeURIComponent(place.id)}`)
      .pipe(catchError(() => this.rollback(previous, 'Could not remove the place.')));
  }

  private fetch(url: string, message: string) {
    return this.http.get<{ places: Place[] }>(url).pipe(
      map((res) => res.places),
      catchError(() => {
        this.errors.show(message);
        return throwError(() => new Error(message));
      }),
    );
  }

  private rollback(previous: Place[], message: string) {
    this.userPlaces.set(previous);
    this.errors.show(message);
    return throwError(() => new Error(message));
  }
}
