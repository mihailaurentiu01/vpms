import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../modules/counter/counterSlice';
import userSlice from '../modules/user/userSlice';
import snackbarSlice from '../modules/snackbar/snackbarSlice';
import authSlice from '../modules/auth/authSlice';
import categorySlice from '../modules/category/categorySlice';
import vehicleSlice from '../modules/vehicle/vehicleSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userSlice,
    snackbar: snackbarSlice,
    auth: authSlice,
    category: categorySlice,
    vehicle: vehicleSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
