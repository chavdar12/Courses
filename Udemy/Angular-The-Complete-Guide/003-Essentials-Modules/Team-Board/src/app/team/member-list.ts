import { Component, computed, signal } from '@angular/core';
import { MEMBERS } from './member';

@Component({
  selector: 'app-member-list',
  standalone: false,
  template: `
    <p>{{ availableCount() }} of {{ members().length }} available</p>
    @for (member of members(); track member.id) {
      <app-member-card [member]="member" (toggle)="toggle($event)" />
    }
  `,
})
export class MemberList {
  readonly members = signal(MEMBERS);
  readonly availableCount = computed(() => this.members().filter((m) => m.available).length);

  toggle(id: number) {
    this.members.update((all) =>
      all.map((m) => (m.id === id ? { ...m, available: !m.available } : m)),
    );
  }
}
