import {
  createAsyncThunk,
  createSlice,
  isAnyOf,
  PayloadAction,
} from '@reduxjs/toolkit';
import User from '../../models/User';
import Api from '../../services/Api';

import Status from '../../models/types/status';
import helpers from '../../helpers/helpers';
import { AxiosResponse } from 'axios';

// Errors
import { ErrorMessages } from '../../models/types/errors/ErrorMessage';

// Thunks
export const registerUser = createAsyncThunk(
  'user/register',
  async (user: User) => {
    try {
      let res: AxiosResponse;

      await helpers.wait(
        2000,
        async () => (res = await Api.registerUser(user))
      );

      return Promise.resolve({ data: res!.data, status: res!.status });
    } catch (e) {
      return Promise.reject(e);
    }
  }
);

export const getUsers = createAsyncThunk('user/get', async () => {
  try {
    let res: AxiosResponse;

    await helpers.wait(2000, async () => (res = await Api.getUsers()));

    return Promise.resolve({ data: res!.data, status: res!.status });
  } catch (e) {
    return Promise.reject(e);
  }
});

export const login = createAsyncThunk(
  'user/login',
  async (data: any, thunkApi: any) => {
    try {
      const { user } = thunkApi.getState();

      if (user.loginAs === 'user') {
        const userIndex: number = user.users.findIndex(
          (item: User) => item.mobileNumber === data.mobileNumber
        );

        if (userIndex > -1) {
          const foundUser: User = user.users[userIndex];
          console.log('founduser', foundUser);

          if (
            foundUser.mobileNumber === data.mobileNumber &&
            foundUser.password === data.password
          ) {
            return Promise.resolve(foundUser);
          }

          throw Error(ErrorMessages.WrongCredentials);
        }

        throw Error(ErrorMessages.WrongCredentials);
      } else if (user.loginAs === 'admin') {
      }

      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  }
);

type userInitialState = {
  loginAs: string;
  status: Status;
  users: User[];
};

const initialState: userInitialState = {
  loginAs: 'user',
  status: '',
  users: [],
};

const useSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    setLoginAs: (state, action: PayloadAction<string>) => {
      state.loginAs = action.payload;
    },
  },
  extraReducers: (builder: any) => {
    builder.addCase(getUsers.fulfilled, (state: any, action: any) => {
      if (action.payload.status === 200) {
        const allUsersTransformed = helpers.transformData(action.payload.data);

        state.users = allUsersTransformed.map((user: any) => {
          const userObj: User = new User(
            user.firstName,
            user.lastName,
            user.mobileNumber,
            user.password,
            user.type
          );

          userObj.setId(user.id);

          return helpers.serializeObject(userObj);
        });
      }
    });

    builder.addMatcher(
      isAnyOf(registerUser.pending, getUsers.pending),
      (state: any, action: any) => {
        state.status = 'pending';
      }
    );

    builder.addMatcher(
      isAnyOf(registerUser.fulfilled, getUsers.fulfilled),
      (state: any, action: any) => {
        state.status = 'loaded';
      }
    );

    builder.addMatcher(
      isAnyOf(registerUser.rejected, getUsers.rejected),
      (state: any, action: any) => {
        state.status = 'loaded';
      }
    );
  },
});

export const UserActions = useSlice.actions;

export default useSlice.reducer;
