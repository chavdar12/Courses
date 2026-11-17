import { TestBed } from '@angular/core/testing';
import { Login, SAVED_EMAIL_KEY } from './login';

describe('Login', () => {
  beforeEach(() => localStorage.clear());

  const setup = async () => {
    const fixture = TestBed.createComponent(Login);
    await fixture.whenStable();
    const el: HTMLElement = fixture.nativeElement;
    const type = (name: string, value: string) => {
      const input = el.querySelector<HTMLInputElement>(`input[name=${name}]`)!;
      input.value = value;
      input.dispatchEvent(new Event('input'));
    };
    const submit = async () => {
      el.querySelector('form')!.dispatchEvent(new Event('submit'));
      await fixture.whenStable();
    };
    return { fixture, el, type, submit };
  };

  it('shows errors for invalid input', async () => {
    const { el, type, submit } = await setup();
    type('email', 'nope');
    type('password', '123');
    await submit();
    expect([...el.querySelectorAll('.error')].map((e) => e.textContent)).toHaveLength(2);
    expect(el.querySelector('.success')).toBeNull();
  });

  it('logs in and remembers the email', async () => {
    const { el, type, submit } = await setup();
    type('email', 'ana@example.com');
    type('password', 'long-enough');
    await submit();
    expect(el.querySelector('.success')?.textContent).toContain('ana@example.com');
    expect(localStorage.getItem(SAVED_EMAIL_KEY)).toBe('ana@example.com');
  });

  it('pre-fills the remembered email', () => {
    localStorage.setItem(SAVED_EMAIL_KEY, 'old@example.com');
    expect(TestBed.createComponent(Login).componentInstance.savedEmail).toBe('old@example.com');
  });
});
