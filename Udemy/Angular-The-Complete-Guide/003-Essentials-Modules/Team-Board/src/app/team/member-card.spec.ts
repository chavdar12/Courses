import { TestBed } from '@angular/core/testing';
import { MemberCard } from './member-card';
import { TeamModule } from './team.module';

describe('MemberCard', () => {
  it('shows the member status and emits toggle', () => {
    TestBed.configureTestingModule({ imports: [TeamModule] });
    const fixture = TestBed.createComponent(MemberCard);
    fixture.componentRef.setInput('member', { id: 9, name: 'Eva', role: 'QA', available: false });
    const ids: number[] = [];
    fixture.componentInstance.toggle.subscribe((id) => ids.push(id));
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('QA · busy');
    fixture.nativeElement.querySelector('button').click();
    expect(ids).toEqual([9]);
  });
});
