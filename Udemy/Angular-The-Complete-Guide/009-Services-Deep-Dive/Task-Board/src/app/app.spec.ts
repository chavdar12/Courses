import { TestBed } from '@angular/core/testing';
import { App } from './app';

it('App renders the task list with its form', () => {
  const fixture = TestBed.createComponent(App);
  fixture.detectChanges();
  expect(fixture.nativeElement.querySelector('app-task-list form')).not.toBeNull();
});
