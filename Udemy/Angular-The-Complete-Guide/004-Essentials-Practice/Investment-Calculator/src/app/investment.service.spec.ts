import { TestBed } from '@angular/core/testing';
import { calculate, InvestmentService } from './investment.service';

describe('calculate', () => {
  it('compounds the return and adds the yearly investment', () => {
    const [y1, y2] = calculate({
      initialInvestment: 1000,
      annualInvestment: 100,
      expectedReturn: 10,
      duration: 2,
    });
    expect(y1).toEqual({
      year: 1,
      interest: 100,
      valueEndOfYear: 1200,
      annualInvestment: 100,
      totalInterest: 100,
      totalAmountInvested: 1100,
    });
    expect(y2.interest).toBe(120);
    expect(y2.valueEndOfYear).toBe(1420);
    expect(y2.totalInterest).toBe(220);
    expect(y2.totalAmountInvested).toBe(1200);
  });

  it('returns no rows for a zero duration', () => {
    expect(
      calculate({ initialInvestment: 1, annualInvestment: 1, expectedReturn: 1, duration: 0 }),
    ).toEqual([]);
  });

  it('stores the results in a signal', () => {
    const service = TestBed.inject(InvestmentService);
    expect(service.results()).toBeNull();
    service.calculate({
      initialInvestment: 0,
      annualInvestment: 10,
      expectedReturn: 0,
      duration: 3,
    });
    expect(service.results()).toHaveLength(3);
  });
});
