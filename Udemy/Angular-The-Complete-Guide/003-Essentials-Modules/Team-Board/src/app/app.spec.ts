import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { AppModule } from './app.module';

it('App renders the team module list', () => {
  TestBed.configureTestingModule({ imports: [AppModule] });
  const fixture = TestBed.createComponent(App);
  fixture.detectChanges();
  expect(fixture.nativeElement.querySelectorAll('app-member-card')).toHaveLength(3);
  expect(fixture.nativeElement.textContent).toContain('Team Board');
});
