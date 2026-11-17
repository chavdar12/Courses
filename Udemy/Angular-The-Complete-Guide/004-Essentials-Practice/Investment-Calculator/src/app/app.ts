import { Component } from '@angular/core';
import { Results } from './results/results';
import { UserInput } from './user-input/user-input';

@Component({
  selector: 'app-root',
  imports: [UserInput, Results],
  template: `
    <h1>Investment Calculator</h1>
    <app-user-input />
    <app-results />
  `,
})
export class App {}
