import { AlertColor } from '@mui/material';
import { createSlice, PayloadAction, isAnyOf } from '@reduxjs/toolkit';
import i18n from 'i18next';

import { registerUser } from '../user/userSlice';
import helpers from '../../helpers/helpers';

import { login } from '../user/userSlice';
import {
  createCategory,
  updateCategory,
  deleteCategory,
} from '../category/categorySlice';
import {
  createVehicle,
  getVehicles,
  updateVehicle,
} from '../vehicle/vehicleSlice';

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

    builder.addCase(login.rejected, (state: SnackBarState, action: any) => {
      state.type = 'error';
      state.message = i18n.t(action.error.message);
      state.open = true;
    });

    builder.addCase(
      createCategory.fulfilled,
      (state: SnackBarState, action: any) => {
        state.type = 'success';
        state.message = i18n.t('alertMessages.successCategoryAdded');
        state.open = true;
      }
    );

    builder.addCase(
      updateCategory.fulfilled,
      (state: SnackBarState, action: any) => {
        state.type = 'success';
        state.message = i18n.t('alertMessages.successCategoryEdit');
        state.open = true;
      }
    );

    builder.addCase(
      updateCategory.rejected,
      (state: SnackBarState, action: any) => {
        state.type = 'error';
        state.message = i18n.t('errorMessages.unexpected');
        state.open = true;
      }
    );

    builder.addCase(
      deleteCategory.fulfilled,
      (state: SnackBarState, action: any) => {
        state.type = 'success';
        state.message = i18n.t('alertMessages.successCategoryDelete');
        state.open = true;
      }
    );

    builder.addCase(
      deleteCategory.rejected,
      (state: SnackBarState, action: any) => {
        state.type = 'error';
        state.message = i18n.t('errorMessages.unexpected');
        state.open = true;
      }
    );

    builder.addCase(
      createVehicle.fulfilled,
      (state: SnackBarState, action: any) => {
        state.type = 'success';
        state.message = i18n.t('alertMessages.successVehicleAdded');
        state.open = true;
      }
    );

    builder.addCase(
      createVehicle.rejected,
      (state: SnackBarState, action: any) => {
        state.type = 'error';
        state.message = i18n.t('errorMessages.unexpected');
        state.open = true;
      }
    );

    builder.addCase(
      getVehicles.rejected,
      (state: SnackBarState, action: any) => {
        state.type = 'error';
        state.message = i18n.t('errorMessages.unexpected');
        state.open = true;
      }
    );

    builder.addCase(
      updateVehicle.fulfilled,
      (state: SnackBarState, action: any) => {
        state.type = 'success';
        state.message = i18n.t('alertMessages.successVehicleUpdated');
        state.open = true;
      }
    );

    builder.addCase(
      updateVehicle.rejected,
      (state: SnackBarState, action: any) => {
        state.type = 'error';
        state.message = i18n.t('errorMessages.unexpected');
        state.open = true;
      }
    );

    builder.addMatcher(
      isAnyOf(login.rejected, createCategory.rejected),
      (state: SnackBarState, action: any) => {
        const { code: errorCode } = action.error;

        state.type = 'error';
        state.message = i18n.t(
          helpers.getFilteredErrorMessage(errorCode as string)
        );
        state.open = true;
      }
    );
  },
});

export const SnackBarActions = useSlice.actions;

export default useSlice.reducer;
