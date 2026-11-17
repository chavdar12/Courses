import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { routes } from './app.routes';
import { NotesService } from './notes.service';

describe('Notes routes', () => {
  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: [provideRouter(routes, withComponentInputBinding())],
    });
  });

  it('adds a note on the home page and opens it by id', async () => {
    const harness = await RouterTestingHarness.create('/');
    const el = harness.routeNativeElement!;
    el.querySelector('input')!.value = 'Hello';
    el.querySelector('form')!.dispatchEvent(new Event('submit', { cancelable: true }));
    harness.detectChanges();
    const link = el.querySelector('li a') as HTMLAnchorElement;
    expect(link.textContent).toBe('Hello');

    const id = TestBed.inject(NotesService).all()[0].id;
    await harness.navigateByUrl(`/notes/${id}`);
    expect(harness.routeNativeElement?.querySelector('.note')?.textContent).toBe('Hello');
  });

  it('shows not found for an unknown note and redirects unknown paths home', async () => {
    const harness = await RouterTestingHarness.create('/notes/missing');
    expect(harness.routeNativeElement?.textContent).toContain('Note not found.');
    await harness.navigateByUrl('/whatever');
    expect(harness.routeNativeElement?.textContent).toContain('No notes yet.');
  });
});
