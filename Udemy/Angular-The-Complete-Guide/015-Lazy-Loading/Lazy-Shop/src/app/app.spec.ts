import { DeferBlockBehavior, DeferBlockState, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { App } from './app';
import { routes } from './app.routes';
import { Catalog } from './catalog/catalog';

describe('lazy loading', () => {
  it('loads the catalog and the admin area on demand, with a route-scoped service', async () => {
    TestBed.configureTestingModule({ providers: [provideRouter(routes)] });
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/');
    expect(harness.routeNativeElement?.textContent).toContain('Catalog');

    await harness.navigateByUrl('/admin');
    expect(harness.routeNativeElement?.textContent).toContain('Visits: 1');
    await harness.navigateByUrl('/');
    await harness.navigateByUrl('/admin');
    // same route injector, so the counter survives navigation
    expect(harness.routeNativeElement?.textContent).toContain('Visits: 2');
  });

  it('shows the placeholder until the deferred offer loads', async () => {
    TestBed.configureTestingModule({
      providers: [provideRouter([])],
      deferBlockBehavior: DeferBlockBehavior.Manual,
    });
    const fixture = TestBed.createComponent(Catalog);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('.show-offer')).not.toBeNull();

    const [block] = await fixture.getDeferBlocks();
    await block.render(DeferBlockState.Loading);
    expect(el.textContent).toContain('Loading offer…');
    await block.render(DeferBlockState.Complete);
    expect(el.querySelector('.offer')?.textContent).toContain('20% off');
  });

  it('App renders the shell', () => {
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('h1 a').getAttribute('href')).toBe('/');
  });
});
