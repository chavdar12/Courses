import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { UserService } from '../../core/services/user.service';
import { Register } from './register';

describe('Register', () => {
  function setup() {
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
    const fixture = TestBed.createComponent(Register);
    fixture.detectChanges();
    const navigate = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
    return {
      component: fixture.componentInstance,
      form: fixture.componentInstance['form'],
      navigate,
    };
  }

  const valid = {
    username: 'Pesho',
    email: 'pesho.petrov@gmail.com',
    tel: '885123456',
    passwords: { password: 'abc12', rePassword: 'abc12' },
  };

  it('does nothing while the form is invalid', () => {
    const { component, navigate } = setup();
    component.register();
    expect(navigate).not.toHaveBeenCalled();
  });

  it('registers with the region prefixed phone and goes to themes', () => {
    const { component, form, navigate } = setup();
    form.patchValue(valid);
    component.register();

    expect(TestBed.inject(UserService).currentUser()).toMatchObject({
      username: 'Pesho',
      tel: '+359885123456',
    });
    expect(navigate).toHaveBeenCalledWith(['/themes']);
  });

  it('rejects mismatched passwords', () => {
    const { form } = setup();
    form.patchValue({ ...valid, passwords: { password: 'abc12', rePassword: 'abc13' } });
    expect(form.controls.passwords.hasError('mismatch')).toBe(true);
  });

  it('shows an error for an already taken email', () => {
    const { component, form, navigate } = setup();
    form.patchValue({ ...valid, email: 'johny.doe@gmail.com' });
    component.register();
    expect(component['error']()).toContain('already registered');
    expect(navigate).not.toHaveBeenCalled();
  });
});
