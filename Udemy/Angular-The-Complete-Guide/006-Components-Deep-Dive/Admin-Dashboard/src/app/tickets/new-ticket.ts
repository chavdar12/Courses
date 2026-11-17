import { Component, ElementRef, output, signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Control } from '../control/control';

@Component({
  selector: 'app-new-ticket',
  imports: [FormsModule, Control],
  template: `
    <form #form (ngSubmit)="submit()">
      <p appControl label="Title"><input #field name="title" [(ngModel)]="title" /></p>
      <p appControl label="Request">
        <textarea #field name="request" [(ngModel)]="request"></textarea>
      </p>
      @if (invalid()) {
        <p role="alert">Both fields are required.</p>
      }
      <button type="submit">Submit</button>
    </form>
  `,
})
export class NewTicket {
  readonly add = output<{ title: string; request: string }>();
  private readonly form = viewChild.required<ElementRef<HTMLFormElement>>('form');
  title = '';
  request = '';
  readonly invalid = signal(false);

  submit() {
    const title = this.title.trim();
    const request = this.request.trim();
    this.invalid.set(!title || !request);
    if (this.invalid()) return;
    this.add.emit({ title, request });
    this.form().nativeElement.reset();
    this.title = this.request = '';
  }
}
