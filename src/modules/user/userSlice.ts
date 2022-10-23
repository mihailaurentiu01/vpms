import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type userInitialState = {
  loginAs: string;
};

const initialState: userInitialState = {
  loginAs: '',
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

export const UserActions = useSlice.actions;

export default useSlice.reducer;
