import { TestBed } from '@angular/core/testing';
import { User } from './user';

describe('User', () => {
  it('shows the user and emits its id when clicked', () => {
    const fixture = TestBed.createComponent(User);
    fixture.componentRef.setInput('user', { id: 'u7', name: 'Ana', initials: 'A' });
    fixture.componentRef.setInput('selected', true);
    const emitted: string[] = [];
    fixture.componentInstance.select.subscribe((id) => emitted.push(id));
    fixture.detectChanges();

    const button: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    expect(button.textContent).toContain('Ana');
    expect(button.classList).toContain('active');
    button.click();
    expect(emitted).toEqual(['u7']);
  });
});
