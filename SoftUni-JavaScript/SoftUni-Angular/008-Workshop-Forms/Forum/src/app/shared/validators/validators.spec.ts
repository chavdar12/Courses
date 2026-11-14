import { FormControl, FormGroup } from '@angular/forms';
import { gmailValidator, matchValidator } from './validators';

describe('validators', () => {
  const gmail = (value: string) => gmailValidator(new FormControl(value));

  it('gmailValidator wants 6+ symbols @gmail.bg or .com', () => {
    expect(gmail('johny.doe@gmail.com')).toBeNull();
    expect(gmail('johnyd@gmail.bg')).toBeNull();
    expect(gmail('john@gmail.com')).toEqual({ gmail: true });
    expect(gmail('johny.doe@yahoo.com')).toEqual({ gmail: true });
    expect(gmail('johny.doe@gmail.org')).toEqual({ gmail: true });
  });

  it('gmailValidator leaves empty values to Validators.required', () => {
    expect(gmail('')).toBeNull();
  });

  it('matchValidator compares two controls of a group', () => {
    const group = new FormGroup(
      { a: new FormControl('x'), b: new FormControl('y') },
      { validators: matchValidator('a', 'b') },
    );
    expect(group.errors).toEqual({ mismatch: true });

    group.controls.b.setValue('x');
    expect(group.errors).toBeNull();
  });
});
