import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { SharedModule } from './shared.module';

@Component({ imports: [SharedModule], template: `<app-card><b>inside</b></app-card>` })
class Host {}

it('Card projects its content', () => {
  const fixture = TestBed.createComponent(Host);
  fixture.detectChanges();
  expect(fixture.nativeElement.querySelector('.card b').textContent).toBe('inside');
});
