import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import Category from '../../models/Category';
import Status from '../../models/types/status';

import helpers from '../../helpers/helpers';
import Api from '../../services/Api';

type categoryInitialState = {
  categories: Category[];
  status: Status;
};

const initialState: categoryInitialState = {
  categories: [],
  status: '',
};

// Thunks
export const createCategory = createAsyncThunk(
  'category/create',
  async (category: Category) => {
    try {
      let res: AxiosResponse;

      await helpers.wait(
        2000,
        async () => (res = await Api.createCategory(category))
      );

      return Promise.resolve({ data: res!.data, status: res!.status });
    } catch (e) {
      return Promise.reject(e);
    }
  }
);

const useSlice = createSlice({
  name: 'Category',
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(
        createCategory.pending,
        (state: categoryInitialState, action: any) => {
          state.status = 'pending';
        }
      )
      .addCase(
        createCategory.fulfilled,
        (state: categoryInitialState, action: any) => {
          state.status = 'loaded';
        }
      )
      .addCase(
        createCategory.rejected,
        (state: categoryInitialState, action: any) => {
          state.status = 'loaded';
        }
      );
  },
});

export const CategoryActions = useSlice.actions;

export default useSlice.reducer;
