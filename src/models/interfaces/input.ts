import { SelectChangeEvent } from '@mui/material';
import { ChangeEvent, FocusEvent } from 'react';

interface Input<T> {
  value: T;
  setValue: (value: T) => void;
  clearValue: () => void;
  clearHasBeenTouched: () => void;
  hasBeenTouched: boolean;
  onBlurHandler: (event: FocusEvent<HTMLInputElement>) => void;
  onChangeValueHandler: (event: ChangeEvent<HTMLInputElement>) => void;
  onSelectValueHandler: (event: SelectChangeEvent<string>) => void;
  onChangeValueTextareaHandler: (
    event: ChangeEvent<HTMLTextAreaElement>
  ) => void;
  isValueValid: boolean;
}

export default Input;
