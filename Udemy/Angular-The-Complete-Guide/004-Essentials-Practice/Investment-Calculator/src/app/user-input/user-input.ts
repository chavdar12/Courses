import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InvestmentService } from '../investment.service';

@Component({
  selector: 'app-user-input',
  imports: [FormsModule],
  template: `
    <form (ngSubmit)="submit()">
      <label>Initial investment <input type="number" name="initial" [(ngModel)]="initial" /></label>
      <label>Annual investment <input type="number" name="annual" [(ngModel)]="annual" /></label>
      <label
        >Expected return (%) <input type="number" name="ret" [(ngModel)]="expectedReturn"
      /></label>
      <label>Duration (years) <input type="number" name="duration" [(ngModel)]="duration" /></label>
      @if (error()) {
        <p role="alert">{{ error() }}</p>
      }
      <button type="submit">Calculate</button>
    </form>
  `,
})
export class UserInput {
  private readonly service = inject(InvestmentService);
  initial = 0;
  annual = 0;
  expectedReturn = 5;
  duration = 10;
  readonly error = signal('');

  submit() {
    const values = [this.initial, this.annual, this.expectedReturn, this.duration].map(Number);
    if (values.some((v) => !Number.isFinite(v) || v < 0) || !Number.isInteger(values[3])) {
      this.error.set('Use non-negative numbers and a whole number of years.');
      return;
    }
    this.error.set('');
    const [initialInvestment, annualInvestment, expectedReturn, duration] = values;
    this.service.calculate({ initialInvestment, annualInvestment, expectedReturn, duration });
  }
}
