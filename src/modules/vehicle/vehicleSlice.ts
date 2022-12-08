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
  selectedVehicle: Vehicle | undefined;
};

const initialState: vehicleInitialState = {
  vehicles: [],
  status: '',
  selectedVehicle: undefined,
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

export const updateVehicle = createAsyncThunk(
  'vehicle/update',
  async (vehicle: Vehicle) => {
    try {
      let res: AxiosResponse;

      await helpers.wait(
        2000,
        async () => (res = await Api.updateVehicle(vehicle))
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
  reducers: {
    setSelectedVehicle(
      state: vehicleInitialState,
      action: PayloadAction<string>
    ) {
      state.selectedVehicle = state.vehicles.find(
        (vehicle: Vehicle) => vehicle.id === action.payload
      );
    },
  },
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

            if (vehicle?.status) {
              vehicleObj.setStatus(vehicle?.status);
            }

            vehicleObj.setCreationDate(vehicle.creationDate);
            vehicleObj.setCategoryName(vehicle.categoryName);
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
        getVehicles.fulfilled,
        getVehicles.rejected
      ),
      (state: vehicleInitialState, action: any) => {
        state.status = 'loaded';
      }
    );
  },
});

export const VehicleActions = useSlice.actions;

export default useSlice.reducer;
