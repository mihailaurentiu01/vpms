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
  selectedCategory: Category | undefined;
};

const initialState: categoryInitialState = {
  categories: [],
  status: '',
  selectedCategory: undefined,
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

export const updateCategory = createAsyncThunk(
  'category/update',
  async (category: Category) => {
    try {
      let res: AxiosResponse;

      await helpers.wait(
        2000,
        async () => (res = await Api.updateCategory(category))
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

export const deleteCategory = createAsyncThunk(
  'category/delete',
  async (_: any = undefined, thunkApi: any) => {
    try {
      const { category } = thunkApi.getState();
      let res: AxiosResponse;

      await helpers.wait(
        2000,
        async () =>
          (res = await Api.deleteCategory(category.selectedCategory.id))
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
  reducers: {
    setSelectedCategory(state, action: PayloadAction<string>) {
      const foundCategory = state.categories.find(
        (category: Category) => category.id === action.payload
      );
      state.selectedCategory = foundCategory as Category;
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

            categoryObj.setCreationDate(category.creationDate);

            categoryObj.setId(category.id);

            return helpers.serializeObject(categoryObj);
          });
        }
      }
    );

    builder.addMatcher(
      isAnyOf(
        createCategory.pending,
        getCategories.pending,
        updateCategory.pending,
        deleteCategory.pending
      ),
      (state: any, action: any) => {
        state.status = 'pending';
      }
    );

    builder.addMatcher(
      isAnyOf(
        createCategory.fulfilled,
        getCategories.fulfilled,
        updateCategory.fulfilled,
        deleteCategory.fulfilled
      ),
      (state: any, action: any) => {
        state.status = 'loaded';
      }
    );

    builder.addMatcher(
      isAnyOf(
        createCategory.rejected,
        getCategories.rejected,
        updateCategory.rejected,
        deleteCategory.rejected
      ),
      (state: any, action: any) => {
        state.status = 'loaded';
      }
    );
  },
});

export const CategoryActions = useSlice.actions;

export default useSlice.reducer;
