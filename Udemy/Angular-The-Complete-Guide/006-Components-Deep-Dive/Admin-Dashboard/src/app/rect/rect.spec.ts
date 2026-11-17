import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Rect } from './rect';

@Component({ imports: [Rect], template: `<app-rect [(size)]="size" />` })
class Host {
  size = signal({ width: 10, height: 5 });
}

it('Rect writes back to the parent through two-way binding', () => {
  const fixture = TestBed.createComponent(Host);
  fixture.detectChanges();
  fixture.nativeElement.querySelector('button').click();
  expect(fixture.componentInstance.size()).toEqual({ width: 20, height: 10 });
});
