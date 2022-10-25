import { AlertColor } from '@mui/material';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import i18n from 'i18next';

import { registerUser } from '../user/userSlice';
import helpers from '../../helpers/helpers';

type SnackBarState = {
  open: boolean;
  type: AlertColor;
  message: string;
};

const initialState: SnackBarState = {
  open: false,
  type: 'success',
  message: '',
};

const useSlice = createSlice({
  name: 'Snackbar',
  initialState,
  reducers: {
    setOpen(state, action: PayloadAction<boolean>) {
      state.open = true;
    },
    setClose(state, action: PayloadAction<string>) {
      if (action.payload === 'clickaway') {
        return;
      }

      state.open = false;
    },
    setType(state, action: PayloadAction<AlertColor>) {
      state.type = action.payload;
    },
    setMessage(state, action: PayloadAction<string>) {
      state.message = action.payload;
    },
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(registerUser.fulfilled, (state: any, action: any) => {
        state.type = 'success';
        state.message = i18n.t('alertMessages.successSignup');
        state.open = true;
      })
      .addCase(registerUser.rejected, (state: any, action: any) => {
        const { code: errorCode } = action.error;

        state.type = 'error';
        state.message = i18n.t(
          helpers.getFilteredErrorMessage(errorCode as string)
        );
        state.open = true;
      });
  },
});

export const SnackBarActions = useSlice.actions;

export default useSlice.reducer;
