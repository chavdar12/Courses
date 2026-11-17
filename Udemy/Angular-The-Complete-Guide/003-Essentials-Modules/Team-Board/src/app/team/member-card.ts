import { Component, input, output } from '@angular/core';
import { Member } from './member';

@Component({
  selector: 'app-member-card',
  standalone: false,
  template: `
    <app-card>
      <h3>{{ member().name }}</h3>
      <p>{{ member().role }} · {{ member().available ? 'available' : 'busy' }}</p>
      <button (click)="toggle.emit(member().id)">Toggle availability</button>
    </app-card>
  `,
})
export class MemberCard {
  readonly member = input.required<Member>();
  readonly toggle = output<number>();
}
