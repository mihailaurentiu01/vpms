import { SelectChangeEvent } from '@mui/material';
import React, { ChangeEvent, useState } from 'react';
import { default as InputInterface } from '../models/interfaces/input';

const useInput = <T,>(validate: (value: T) => boolean): InputInterface<T> => {
  const [value, setValue] = useState<T>('' as T);
  const [hasBeenTouched, setHasBeenTouched] = useState<boolean>(false);

  const onChangeValueHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value as T);
  };

  const onChangeValueTextareaHandler = (
    event: ChangeEvent<HTMLTextAreaElement>
  ) => {
    setValue(event.target.value as T);
  };

  const onSelectValueHandler = (event: SelectChangeEvent<string>) => {
    setValue(event.target.value as T);
  };

  const clearValue = () => {
    setValue('' as T);
  };

  const clearHasBeenTouched = () => {
    setHasBeenTouched(false);
  };

  const onBlurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    setHasBeenTouched(true);
  };

  const isValueValid = validate(value as T);

  return {
    value,
    setValue,
    clearValue,
    clearHasBeenTouched,
    hasBeenTouched,
    onBlurHandler,
    onSelectValueHandler,
    onChangeValueHandler,
    onChangeValueTextareaHandler,
    isValueValid,
  };
};

export default useInput;
