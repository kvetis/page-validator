import { FormControl } from '@angular/forms';
import { pageValidator } from './page-validator';

const expectedError = { page: true };

describe('page validator', () => {
  let control: FormControl;
  beforeEach(() => control = new FormControl());

  it('validates single', () => {
    control.setValue('1');
    const result = pageValidator(control);
    expect(result).toBeFalsy();
  });

  it('validates range', () => {
    control.setValue('1-2');
    const result = pageValidator(control);
    expect(result).toBeFalsy();
  });

  it('validates multiple', () => {
    control.setValue('1-2, 5, 8-9');
    const result = pageValidator(control);
    expect(result).toBeFalsy();
  });

  it('validates freely', () => {
    control.setValue('1,1-2,    20, 31, 10-15,');
    const result = pageValidator(control);
    expect(result).toBeFalsy();
  });

  it('fails on text', () => {
    control.setValue('One');
    const result = pageValidator(control);
    expect(result).toEqual(expectedError);
  });

  it('fails on incorrect connector', () => {
    control.setValue('1 and 2');
    const result = pageValidator(control);
    expect(result).toEqual(expectedError);
  });

  it('fails on academic', () => {
    control.setValue('pp. 123-456');
    const result = pageValidator(control);
    expect(result).toEqual(expectedError);
  });


  // This was not really asked for in the test description but i feel like
  // it should be part of it.
  // The question is whether it is more likely that the user has inputted
  // that by mistake or intentionaly. I lean towards the mistake situation.
  it('fails on negative range', () => {
    control.setValue('1000-456');
    const result = pageValidator(control);
    expect(result).toEqual(expectedError);
  });


});
