import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { App } from './app';

const rila = { id: 'p1', title: 'Rila Lakes', country: 'Bulgaria' };

describe('App', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }),
  );

  it('loads both lists and adds a favorite on click', async () => {
    const fixture = TestBed.createComponent(App);
    const http = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('Loading places…');

    http.expectOne('/api/user-places').flush({ places: [] });
    http.expectOne('/api/places').flush({ places: [rila] });
    await fixture.whenStable();
    expect(el.textContent).toContain('Pick places you like');

    (el.querySelector('app-available-places button') as HTMLButtonElement).click();
    await fixture.whenStable();
    expect(el.querySelector('app-user-places li')?.textContent).toContain('Rila Lakes');
    http.expectOne('/api/user-places').flush({ places: [rila] });
    http.verify();
  });

  it('shows a dismissible global error when loading fails', async () => {
    const fixture = TestBed.createComponent(App);
    const http = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
    http.expectOne('/api/user-places').flush({ places: [] });
    http.expectOne('/api/places').flush(null, { status: 500, statusText: 'Down' });
    await fixture.whenStable();
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('[role=alert]')?.textContent).toContain('Could not load the places');
    expect(el.querySelector('app-available-places .error')).not.toBeNull();

    (el.querySelector('[role=alert] button') as HTMLButtonElement).click();
    await fixture.whenStable();
    expect(el.querySelector('[role=alert]')).toBeNull();
  });
});
