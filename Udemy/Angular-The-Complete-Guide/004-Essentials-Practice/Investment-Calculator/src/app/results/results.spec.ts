import { TestBed } from '@angular/core/testing';
import { InvestmentService } from '../investment.service';
import { Results } from './results';

describe('Results', () => {
  it('shows a hint, then one formatted row per year', () => {
    const fixture = TestBed.createComponent(Results);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('press Calculate');

    TestBed.inject(InvestmentService).calculate({
      initialInvestment: 1000,
      annualInvestment: 0,
      expectedReturn: 10,
      duration: 2,
    });
    fixture.detectChanges();
    const rows = fixture.nativeElement.querySelectorAll('tbody tr');
    expect(rows).toHaveLength(2);
    expect(rows[1].textContent).toContain('$1,210.00');
  });
});
