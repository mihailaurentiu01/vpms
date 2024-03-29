import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useTranslation } from 'react-i18next';
import { Button } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import TextareaAutosize from '@mui/material/TextareaAutosize';

import useInput from '../../../hooks/useInput';

import { useHistory } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { RootState } from '../../../app/store';

import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Vehicle from '../../../models/Vehicle';
import { updateVehicle } from '../../../modules/vehicle/vehicleSlice';
import VehicleStatus from '../../../models/types/VehicleStatus';
import { useEffect } from 'react';
import Status from '../../../models/types/status';

const VehicleDetailsForm = () => {
  const { t } = useTranslation();

  const { loggedInUser } = useAppSelector((state: RootState) => state.auth);
  const { status, selectedVehicle } = useAppSelector(
    (state: RootState) => state.vehicle
  );
  const { categories } = useAppSelector((state: RootState) => state.category);

  const history = useHistory();

  const dispatch = useAppDispatch();

  const vehicleStatuses: VehicleStatus[] = ['parked', 'out'];

  const {
    value: detailsValue,
    setValue: setDetailsValue,
    clearValue: clearDetailsValue,
    clearHasBeenTouched: clearDetailsValueHasBeenTouches,
    onChangeValueTextareaHandler: onChangeDetailsValueHandler,
    onBlurHandler: onBlurDetailsValueHandler,
    hasBeenTouched: hasDetailsValueBeenTouched,
    isValueValid: isDetailsValueValid,
  } = useInput<string>((val) => val.length > 0);

  const {
    value: parkingChargeValue,
    setValue: setParkingChargeValue,
    onChangeValueHandler: onChangeParkingChargeValue,
    isValueValid: isParkingChargeValueValid,
    hasBeenTouched: hasParkingChargeValueBeenTouched,
    onBlurHandler: onBlurParkingChargeValueHandler,
  } = useInput<number>((val) => val > 0);

  const {
    value: statusValue,
    setValue: setStatusValue,
    clearValue: clearStatusValue,
    clearHasBeenTouched: clearStatusValueHasBeenTouchedValue,
    onSelectValueHandler: onChangeStatusValueHandler,
    onBlurHandler: onBlurStatusValueHandler,
    hasBeenTouched: hasStatusValueBeenTouched,
    isValueValid: isStatusValueValid,
  } = useInput<string>((val) => val.length > 0);

  const isFormValid =
    isDetailsValueValid && isParkingChargeValueValid && isStatusValueValid;

  useEffect(() => {
    if (selectedVehicle!.status === 'out') {
      setDetailsValue(selectedVehicle?.details as string);
      setParkingChargeValue(selectedVehicle?.parkingCharge as number);
      setStatusValue(selectedVehicle?.status as Status);
    }
  }, [selectedVehicle]);

  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isFormValid) {
      const vehicle = new Vehicle(
        selectedVehicle!.category,
        selectedVehicle!.company,
        selectedVehicle!.registrationNumber,
        selectedVehicle!.owner,
        selectedVehicle!.contactNumber,
        selectedVehicle!.userId
      );

      vehicle.setId(selectedVehicle!.id);
      vehicle.setCreationDate(selectedVehicle!.creationDate);
      vehicle.setCategoryName(selectedVehicle?.categoryName as string);

      vehicle!.setDetails(detailsValue);
      vehicle!.setParkingCharge(parkingChargeValue);
      vehicle!.setStatus(statusValue as VehicleStatus);

      dispatch(updateVehicle(vehicle));
    }
  };

  return (
    <>
      <Container maxWidth='md'>
        {status === 'pending' && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
              mt: 3,
            }}
          >
            <CircularProgress />
          </Box>
        )}

        {(status === '' || status === 'loaded') && (
          <Box
            sx={{
              flexGrow: 1,
            }}
          >
            <Box
              component='form'
              sx={{}}
              noValidate
              autoComplete='off'
              onSubmit={onSubmitHandler}
            >
              <Grid container spacing={2} justifyContent='center' sx={{ p: 1 }}>
                <Grid item xs={12}>
                  <InputLabel id='details'>{t('details')}</InputLabel>
                </Grid>

                <Grid item xs={12}>
                  <TextareaAutosize
                    minRows={5}
                    placeholder={t('details')}
                    style={{ width: '100%' }}
                    value={detailsValue}
                    onChange={onChangeDetailsValueHandler}
                    disabled={selectedVehicle!.status === 'out'}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    value={parkingChargeValue}
                    error={
                      !isParkingChargeValueValid &&
                      hasParkingChargeValueBeenTouched
                    }
                    helperText={t('requiredField')}
                    onChange={onChangeParkingChargeValue}
                    onBlur={onBlurParkingChargeValueHandler}
                    sx={{ width: { xs: 1, md: 1 } }}
                    type='number'
                    label={t('parkingCharge')}
                    variant='outlined'
                    required
                    disabled={selectedVehicle!.status === 'out'}
                  />
                </Grid>

                <Grid item xs={12}>
                  <InputLabel id='select-status'>{t('status')}</InputLabel>
                  <Select
                    labelId='select-status'
                    id='select-vehicle-status'
                    value={statusValue}
                    sx={{ minWidth: '100%' }}
                    label={t('category')}
                    onChange={onChangeStatusValueHandler}
                    disabled={selectedVehicle!.status === 'out'}
                  >
                    {vehicleStatuses.map((status, index) => {
                      return (
                        <MenuItem key={status} value={status}>
                          {status[0].toUpperCase() + status.substring(1)}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </Grid>

                <Grid item xs={12}>
                  <Button
                    disabled={!isFormValid || selectedVehicle!.status === 'out'}
                    type='submit'
                    sx={{ width: 1 }}
                    variant='contained'
                  >
                    {t('submit')}
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        )}
      </Container>
    </>
  );
};

export default VehicleDetailsForm;
