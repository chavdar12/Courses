import {
  FULL_NAME_PATTERN,
  IMAGE_URL_PATTERN,
  PASSWORD_PATTERN,
  PHONE_PATTERN,
} from './form-options';

describe('form patterns', () => {
  it('full name needs two capitalized names', () => {
    expect(FULL_NAME_PATTERN.test('John Doe')).toBe(true);
    expect(FULL_NAME_PATTERN.test('john Doe')).toBe(false);
    expect(FULL_NAME_PATTERN.test('John')).toBe(false);
    expect(FULL_NAME_PATTERN.test('John D0e')).toBe(false);
  });

  it('phone is exactly 9 digits', () => {
    expect(PHONE_PATTERN.test('888123456')).toBe(true);
    expect(PHONE_PATTERN.test('88812345')).toBe(false);
    expect(PHONE_PATTERN.test('88812345a')).toBe(false);
  });

  it('password is 3-16 letters or digits', () => {
    expect(PASSWORD_PATTERN.test('abc')).toBe(true);
    expect(PASSWORD_PATTERN.test('ab')).toBe(false);
    expect(PASSWORD_PATTERN.test('a'.repeat(17))).toBe(false);
    expect(PASSWORD_PATTERN.test('abc!')).toBe(false);
  });

  it('image url starts with http and ends with jpg/png', () => {
    expect(IMAGE_URL_PATTERN.test('https://x.com/a.png')).toBe(true);
    expect(IMAGE_URL_PATTERN.test('http://x.com/a.jpg')).toBe(true);
    expect(IMAGE_URL_PATTERN.test('ftp://x.com/a.png')).toBe(false);
    expect(IMAGE_URL_PATTERN.test('https://x.com/a.gif')).toBe(false);
  });
});
