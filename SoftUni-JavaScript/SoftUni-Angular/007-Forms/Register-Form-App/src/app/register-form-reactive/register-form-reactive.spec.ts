import { TestBed } from '@angular/core/testing';
import { RegisterFormReactive } from './register-form-reactive';

describe('RegisterFormReactive', () => {
  function setup() {
    const fixture = TestBed.createComponent(RegisterFormReactive);
    fixture.detectChanges();
    return { fixture, form: fixture.componentInstance['form'] };
  }

  const valid = {
    fullName: 'John Doe',
    email: 'john@doe.com',
    phone: '888123456',
    passwords: { password: 'abc123', rePassword: 'abc123' },
  };

  it('is valid with correct data', () => {
    const { form } = setup();
    form.patchValue(valid);
    expect(form.valid).toBe(true);
  });

  it('flags mismatched passwords on the group', () => {
    const { form } = setup();
    form.patchValue({ ...valid, passwords: { password: 'abc123', rePassword: 'abc124' } });
    expect(form.controls.passwords.hasError('mismatch')).toBe(true);
    expect(form.valid).toBe(false);
  });

  it('disables submit while invalid', () => {
    const { fixture } = setup();
    const button: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    expect(button.disabled).toBe(true);
  });

  it('submit stores the value and resets to defaults', () => {
    const { fixture, form } = setup();
    form.patchValue(valid);
    fixture.componentInstance.submit();
    expect(fixture.componentInstance['submitted']).toMatchObject({ fullName: 'John Doe' });
    expect(form.controls.fullName.value).toBe('');
    expect(form.controls.countryCode.value).toBe('+359');
  });
});
