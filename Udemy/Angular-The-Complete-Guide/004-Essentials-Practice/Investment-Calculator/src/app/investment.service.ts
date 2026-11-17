import { Injectable, signal } from '@angular/core';

export interface InvestmentInput {
  initialInvestment: number;
  annualInvestment: number;
  expectedReturn: number; // percent per year
  duration: number; // years
}

export interface YearResult {
  year: number;
  interest: number;
  valueEndOfYear: number;
  annualInvestment: number;
  totalInterest: number;
  totalAmountInvested: number;
}

export function calculate(input: InvestmentInput): YearResult[] {
  const results: YearResult[] = [];
  let value = input.initialInvestment;
  let totalInterest = 0;
  for (let year = 1; year <= input.duration; year++) {
    const interest = value * (input.expectedReturn / 100);
    value += interest + input.annualInvestment;
    totalInterest += interest;
    results.push({
      year,
      interest,
      valueEndOfYear: value,
      annualInvestment: input.annualInvestment,
      totalInterest,
      totalAmountInvested: input.initialInvestment + input.annualInvestment * year,
    });
  }
  return results;
}

@Injectable({ providedIn: 'root' })
export class InvestmentService {
  readonly results = signal<YearResult[] | null>(null);

  calculate(input: InvestmentInput) {
    this.results.set(calculate(input));
  }
}
