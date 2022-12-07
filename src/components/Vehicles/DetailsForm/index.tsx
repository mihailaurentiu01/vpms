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
import { createVehicle } from '../../../modules/vehicle/vehicleSlice';
import VehicleStatus from '../../../models/types/VehicleStatus';

const VehicleDetailsForm = () => {
  const { t } = useTranslation();

  const { loggedInUser } = useAppSelector((state: RootState) => state.auth);
  const { status } = useAppSelector((state: RootState) => state.vehicle);
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

  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isFormValid) {
      console.log('yes');
    }
  };

  return (
    <>
      <Container maxWidth='md'>
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
                  disabled={!isFormValid}
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
      </Container>
    </>
  );
};

export default VehicleDetailsForm;
