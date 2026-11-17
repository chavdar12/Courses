import { TestBed } from '@angular/core/testing';
import { InvestmentService } from '../investment.service';
import { UserInput } from './user-input';

describe('UserInput', () => {
  it('calculates valid input and rejects negative values', () => {
    const fixture = TestBed.createComponent(UserInput);
    const form = fixture.componentInstance;
    const service = TestBed.inject(InvestmentService);

    form.initial = -5;
    form.submit();
    fixture.detectChanges();
    expect(service.results()).toBeNull();
    expect(fixture.nativeElement.querySelector('[role=alert]')).not.toBeNull();

    form.initial = 1000;
    form.duration = 3;
    form.submit();
    fixture.detectChanges();
    expect(service.results()).toHaveLength(3);
    expect(fixture.nativeElement.querySelector('[role=alert]')).toBeNull();
  });
});
