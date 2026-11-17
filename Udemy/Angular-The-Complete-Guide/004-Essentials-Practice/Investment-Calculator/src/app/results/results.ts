import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { InvestmentService } from '../investment.service';

@Component({
  selector: 'app-results',
  imports: [CurrencyPipe],
  template: `
    @if (service.results(); as rows) {
      <table>
        <thead>
          <tr>
            <th>Year</th>
            <th>Investment value</th>
            <th>Interest (year)</th>
            <th>Total interest</th>
            <th>Invested capital</th>
          </tr>
        </thead>
        <tbody>
          @for (row of rows; track row.year) {
            <tr>
              <td>{{ row.year }}</td>
              <td>{{ row.valueEndOfYear | currency }}</td>
              <td>{{ row.interest | currency }}</td>
              <td>{{ row.totalInterest | currency }}</td>
              <td>{{ row.totalAmountInvested | currency }}</td>
            </tr>
          }
        </tbody>
      </table>
    } @else {
      <p>Enter your numbers and press Calculate.</p>
    }
  `,
})
export class Results {
  protected readonly service = inject(InvestmentService);
}
