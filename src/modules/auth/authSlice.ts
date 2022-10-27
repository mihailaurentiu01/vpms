import { createSlice } from '@reduxjs/toolkit';
import User from '../../models/User';

import { login } from '../user/userSlice';

type authInitialState = {
  loggedIn: boolean;
  loggedInUser: User | null;
  loggedInAs: string;
};

const initialState: authInitialState = {
  loggedIn: false,
  loggedInUser: null,
  loggedInAs: '',
};

const useSlice = createSlice({
  name: 'Auth',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder.addCase(login.fulfilled, (state: authInitialState, action: any) => {
      state.loggedIn = true;
      state.loggedInUser = action.payload;
      state.loggedInAs = action.payload.type;
    });
  },
});

export const AuthActions = useSlice.actions;

export default useSlice.reducer;
