import { Component } from '@angular/core';
import { Resources } from './resources';

@Component({
  selector: 'app-root',
  imports: [Resources],
  template: `<h1>Learning Resources</h1>
    <app-resources />`,
})
export class App {}
