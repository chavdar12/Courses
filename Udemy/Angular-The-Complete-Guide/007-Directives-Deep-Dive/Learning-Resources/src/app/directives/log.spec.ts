import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { clicks, Log } from './log';

@Component({ selector: 'app-box', hostDirectives: [Log], template: `box` })
class Box {}

it('Log records clicks on the host it is attached to', () => {
  const fixture = TestBed.createComponent(Box);
  fixture.nativeElement.click();
  expect(clicks.at(-1)).toBe('div');
});
