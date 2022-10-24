import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import User from '../../models/User';
import Api from '../../services/Api';

type userInitialState = {
  loginAs: string;
};

const initialState: userInitialState = {
  loginAs: 'user',
};

const useSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    setLoginAs: (state, action: PayloadAction<string>) => {
      state.loginAs = action.payload;
    },
  },
});

// Thunks
export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (user: User) => {
    try {
      const res = await Api.registerUser(user);
      return Promise.resolve({ data: res.data, status: res.status });
    } catch (e) {
      return Promise.reject(e);
    }
  }
);

export const UserActions = useSlice.actions;

export default useSlice.reducer;