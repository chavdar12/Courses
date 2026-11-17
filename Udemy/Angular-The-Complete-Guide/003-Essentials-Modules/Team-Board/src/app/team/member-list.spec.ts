import { TestBed } from '@angular/core/testing';
import { MemberList } from './member-list';
import { TeamModule } from './team.module';

describe('MemberList (TeamModule)', () => {
  it('renders members through the shared card and toggles availability', () => {
    TestBed.configureTestingModule({ imports: [TeamModule] });
    const fixture = TestBed.createComponent(MemberList);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;

    expect(el.querySelectorAll('app-card')).toHaveLength(3);
    expect(el.textContent).toContain('2 of 3 available');

    (el.querySelectorAll('app-member-card button')[1] as HTMLButtonElement).click();
    fixture.detectChanges();
    expect(el.textContent).toContain('3 of 3 available');
  });
});
