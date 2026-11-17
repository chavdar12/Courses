import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ErrorService } from '../error.service';
import { loggingInterceptor, requestLog } from '../logging.interceptor';
import { PlacesService } from './places.service';

const rila = { id: 'p1', title: 'Rila Lakes', country: 'Bulgaria' };
const lofoten = { id: 'p3', title: 'Lofoten', country: 'Norway' };

describe('PlacesService', () => {
  let service: PlacesService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([loggingInterceptor])),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(PlacesService);
    http = TestBed.inject(HttpTestingController);
  });
  afterEach(() => http.verify());

  it('loads places, unwrapping the response, through the interceptor', () => {
    let result: unknown;
    service.loadAvailablePlaces().subscribe((p) => (result = p));
    const req = http.expectOne('/api/places');
    expect(req.request.headers.get('X-Client')).toBe('favorite-places');
    req.flush({ places: [rila] });
    expect(result).toEqual([rila]);
    expect(requestLog).toContain('GET /api/places');
  });

  it('reports load errors to the ErrorService', () => {
    let failed = false;
    service.loadAvailablePlaces().subscribe({ error: () => (failed = true) });
    http.expectOne('/api/places').flush(null, { status: 500, statusText: 'Server Error' });
    expect(failed).toBe(true);
    expect(TestBed.inject(ErrorService).message()).toContain('Could not load the places');
  });

  it('adds optimistically and keeps the place on success', () => {
    service.addPlace(rila).subscribe();
    expect(service.loadedUserPlaces()).toEqual([rila]);
    const req = http.expectOne('/api/user-places');
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual({ placeId: 'p1' });
    req.flush({ places: [rila] });
    expect(service.loadedUserPlaces()).toEqual([rila]);
  });

  it('rolls back a failed remove', () => {
    service.loadUserPlaces().subscribe();
    http.expectOne('/api/user-places').flush({ places: [rila, lofoten] });

    service.removePlace(lofoten).subscribe({ error: () => {} });
    expect(service.loadedUserPlaces()).toEqual([rila]);
    http.expectOne('/api/user-places/p3').flush(null, { status: 500, statusText: 'Down' });
    expect(service.loadedUserPlaces()).toEqual([rila, lofoten]);
    expect(TestBed.inject(ErrorService).message()).toBe('Could not remove the place.');
  });
});
