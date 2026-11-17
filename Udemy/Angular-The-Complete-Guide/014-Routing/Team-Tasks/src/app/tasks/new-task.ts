import { Component, inject, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CanDeactivateFn, Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-new-task',
  imports: [FormsModule],
  template: `
    <form (ngSubmit)="save()">
      <input name="title" placeholder="Title" [(ngModel)]="title" />
      <input name="dueDate" type="date" [(ngModel)]="dueDate" />
      <button type="submit">Save</button>
    </form>
  `,
})
export class NewTask {
  readonly userId = input.required<string>(); // inherited from the parent route param
  private readonly data = inject(DataService);
  private readonly router = inject(Router);
  title = '';
  dueDate = '';
  saved = false;

  async save() {
    if (!this.title.trim() || !this.dueDate) return;
    this.data.add(this.userId(), this.title.trim(), this.dueDate);
    this.saved = true;
    await this.router.navigate(['/users', this.userId(), 'tasks'], { replaceUrl: true });
  }
}

// guard: ask before throwing away a half-filled form
export const confirmLeave: CanDeactivateFn<NewTask> = (cmp) =>
  cmp.saved || (!cmp.title && !cmp.dueDate) || window.confirm('Discard this task?');
