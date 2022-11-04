import {
  createAsyncThunk,
  createSlice,
  isAnyOf,
  PayloadAction,
} from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import Category from '../../models/Category';
import Status from '../../models/types/status';

import helpers from '../../helpers/helpers';
import Api from '../../services/Api';

type categoryInitialState = {
  categories: Category[];
  status: Status;
  selectedCategory: Category | {};
};

const initialState: categoryInitialState = {
  categories: [],
  status: '',
  selectedCategory: {},
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

export const getCategories = createAsyncThunk('category/get', async () => {
  try {
    let res: AxiosResponse;

    await helpers.wait(2000, async () => (res = await Api.getCategories()));

    return Promise.resolve({ data: res!.data, status: res!.status });
  } catch (e) {
    return Promise.reject(e);
  }
});

const useSlice = createSlice({
  name: 'Category',
  initialState,
  reducers: {
    setSelectedCategory(state, action: PayloadAction<string>) {
      const foundCategory = state.categories.find(
        (category: Category) => category.id === action.payload
      );
    },
  },
  extraReducers: (builder: any) => {
    builder.addCase(
      getCategories.fulfilled,
      (state: categoryInitialState, action: any) => {
        if (action.payload.status === 200) {
          const allCategoriesTransformed = helpers.transformData(
            action.payload.data
          );

          state.categories = allCategoriesTransformed.map((category: any) => {
            const categoryObj: Category = new Category(
              category.name,
              category.userId
            );

            categoryObj.setId(category.id);

            return helpers.serializeObject(categoryObj);
          });
        }
      }
    );

    builder.addMatcher(
      isAnyOf(createCategory.pending, getCategories.pending),
      (state: any, action: any) => {
        state.status = 'pending';
      }
    );

    builder.addMatcher(
      isAnyOf(createCategory.fulfilled, getCategories.fulfilled),
      (state: any, action: any) => {
        state.status = 'loaded';
      }
    );

    builder.addMatcher(
      isAnyOf(createCategory.rejected, getCategories.rejected),
      (state: any, action: any) => {
        state.status = 'loaded';
      }
    );
  },
});

export const CategoryActions = useSlice.actions;

export default useSlice.reducer;
