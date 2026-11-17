import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { equalValues, minChecked, mustContainDigit } from './validators';

describe('validators', () => {
  it('equalValues compares two controls in a group', () => {
    const g = new FormGroup(
      { a: new FormControl('x'), b: new FormControl('y') },
      { validators: equalValues('a', 'b') },
    );
    expect(g.errors).toEqual({ valuesNotEqual: true });
    g.controls.b.setValue('x');
    expect(g.errors).toBeNull();
  });

  it('mustContainDigit needs a number', () => {
    expect(mustContainDigit(new FormControl('abc'))).toEqual({ noDigit: true });
    expect(mustContainDigit(new FormControl('abc1'))).toBeNull();
  });

  it('minChecked counts ticked boxes', () => {
    const arr = new FormArray([new FormControl(false), new FormControl(true)], minChecked(2));
    expect(arr.errors).toEqual({ minChecked: 2 });
    arr.at(0).setValue(true);
    expect(arr.errors).toBeNull();
  });
});
