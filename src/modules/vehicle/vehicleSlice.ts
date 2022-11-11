import {
  createAsyncThunk,
  createSlice,
  isAnyOf,
  PayloadAction,
} from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import Status from '../../models/types/status';

import helpers from '../../helpers/helpers';
import Api from '../../services/Api';
import Vehicle from '../../models/Vehicle';

type vehicleInitialState = {
  vehicles: Vehicle[];
  status: Status;
};

const initialState: vehicleInitialState = {
  vehicles: [],
  status: '',
};

// Thunks
export const createVehicle = createAsyncThunk(
  'vehicle/create',
  async (vehicle: Vehicle) => {
    try {
      let res: AxiosResponse;

      await helpers.wait(
        2000,
        async () => (res = await Api.createVehicle(vehicle))
      );

      return Promise.resolve({ data: res!.data, status: res!.status });
    } catch (e) {
      return Promise.reject(e);
    }
  }
);

const useSlice = createSlice({
  name: 'Vehicle',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      createVehicle.pending,
      (state: vehicleInitialState, action: any) => {
        state.status = 'pending';
      }
    );

    builder.addMatcher(
      isAnyOf(createVehicle.fulfilled, createVehicle.rejected),
      (state: vehicleInitialState, action: any) => {
        state.status = 'loaded';
      }
    );
  },
});

export const CategoryActions = useSlice.actions;

export default useSlice.reducer;
