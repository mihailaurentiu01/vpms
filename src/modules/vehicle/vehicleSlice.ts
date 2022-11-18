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

export const getVehicles = createAsyncThunk('vehicle/get', async () => {
  try {
    let res: AxiosResponse;

    await helpers.wait(2000, async () => (res = await Api.getVehicles()));

    return Promise.resolve({ data: res!.data, status: res!.status });
  } catch (e) {
    return Promise.reject(e);
  }
});

const useSlice = createSlice({
  name: 'Vehicle',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getVehicles.fulfilled,
      (state: vehicleInitialState, action: any) => {
        if (action.payload.status === 200) {
          const allVehiclesTransformed = helpers.transformData(
            action.payload.data
          );

          state.vehicles = allVehiclesTransformed.map((vehicle: any) => {
            const vehicleObj: Vehicle = new Vehicle(
              vehicle.category,
              vehicle.company,
              vehicle.registrationNumber,
              vehicle.owner,
              vehicle.contactNumber,
              vehicle.userId
            );

            vehicleObj.setCreationDate(vehicle.creationDate);

            vehicleObj.setId(vehicle.id);

            return helpers.serializeObject(vehicleObj);
          });
        }
      }
    );

    builder.addMatcher(
      isAnyOf(createVehicle.pending, getVehicles.pending),
      (state: vehicleInitialState, action: any) => {
        state.status = 'pending';
      }
    );

    builder.addMatcher(
      isAnyOf(
        createVehicle.fulfilled,
        createVehicle.rejected,
        getVehicles.fulfilled
      ),
      (state: vehicleInitialState, action: any) => {
        state.status = 'loaded';
      }
    );
  },
});

export const CategoryActions = useSlice.actions;

export default useSlice.reducer;
