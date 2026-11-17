import { TestBed } from '@angular/core/testing';
import { Signup } from './signup';

describe('Signup', () => {
  it('lists every validation error after a failed submit', async () => {
    const fixture = TestBed.createComponent(Signup);
    const signup = fixture.componentInstance;
    signup.form.patchValue({ email: 'bad', passwords: { password: 'short', confirm: 'other' } });
    signup.submit();
    await fixture.whenStable();
    const errors = [...fixture.nativeElement.querySelectorAll('.errors li')].map(
      (li) => li.textContent,
    );
    expect(errors).toEqual([
      'Enter a valid email.',
      'The password needs 8+ characters and a digit.',
      'The passwords do not match.',
      'Pick at least one source.',
      'Accept the terms.',
    ]);
    expect(signup.result()).toBeNull();
  });

  it('submits a valid form and resets it', () => {
    const fixture = TestBed.createComponent(Signup);
    const signup = fixture.componentInstance;
    signup.form.setValue({
      email: 'ana@example.com',
      passwords: { password: 'secret123', confirm: 'secret123' },
      role: 'teacher',
      sources: [false, true, false],
      terms: true,
    });
    signup.submit();
    expect(signup.result()).toEqual({
      email: 'ana@example.com',
      role: 'teacher',
      sources: ['A friend'],
    });
    expect(signup.form.controls.email.value).toBe('');
  });
});
