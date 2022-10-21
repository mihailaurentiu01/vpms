import { ChangeEvent, FocusEvent } from 'react';

interface Input<T> {
  value: T;
  setValue: (value: T) => void;
  clearValue: () => void;
  clearHasBeenTouched: () => void;
  hasBeenTouched: boolean;
  onBlurHandler: (event: FocusEvent<HTMLInputElement>) => void;
  onChangeValueHandler: (event: ChangeEvent<HTMLInputElement>) => void;
  isValueValid: boolean;
}

export default Input;
