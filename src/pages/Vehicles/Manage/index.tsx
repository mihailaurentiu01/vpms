import { Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import Breadcrumb from '../../../components/Breadcrumb';
import BreadcrumbStyled from '../../../components/Breadcrumb/styled/index';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CategoryIcon from '@mui/icons-material/Category';
import VehicleIcon from '@mui/icons-material/TimeToLeave';
import ParkingIcon from '@mui/icons-material/LocalParking';
import Table from '../../../components/Table/index';
import TableCell from '@mui/material/TableCell';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';

import routes from '../../../helpers/routes';
import ManageParkedVehicles from './ParkedVehicles';
import ManageOutVehicles from './OutVehicles';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { getVehicles } from '../../../modules/vehicle/vehicleSlice';
import { RootState } from '../../../app/store';
import Vehicle from '../../../models/Vehicle';

const label = { inputProps: { 'aria-label': 'Switch vehicle in' } };

const ManageVehicles = () => {
  const [isVehicleParked, setIsVehicleParked] = useState<boolean>(true);

  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const { status, vehicles } = useAppSelector(
    (state: RootState) => state.vehicle
  );

  const onChangeIsVehicleParked = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsVehicleParked(e?.target.checked);
  };

  const parkedVehicles: Vehicle[] = vehicles?.filter(
    (vehicle: Vehicle) => vehicle.status === 'parked'
  );

  const outVehicles: Vehicle[] = vehicles?.filter(
    (vehicle: Vehicle) => vehicle.status === 'out'
  );

  useEffect(() => {
    dispatch(getVehicles());
  }, [getVehicles]);

  return (
    <Box
      sx={{
        mt: 2,
        pl: 2,
      }}
    >
      <Typography align='left' variant='h4'>
        {t('menuOptions.manage')} {t('menuOptions.vehicles')}
      </Typography>

      <Grid container spacing={2} justifyContent='left' sx={{ p: 0, mb: 2 }}>
        <Grid item xs={11}>
          <Breadcrumb>
            <BreadcrumbStyled
              component='p'
              to={routes.dashboard}
              label={t('menuOptions.dashboard')}
              icon={<DashboardIcon fontSize='small' />}
            />
            <BreadcrumbStyled
              component='p'
              to={routes.vehicle.base}
              label={t('menuOptions.vehicles')}
              icon={<VehicleIcon fontSize='small' />}
            />
            {isVehicleParked && (
              <BreadcrumbStyled
                component='p'
                to={routes.vehicle.base}
                label={t('menuOptions.manage') + ' ' + t('parked')}
                icon={<ParkingIcon fontSize='small' />}
              />
            )}

            {!isVehicleParked && (
              <BreadcrumbStyled
                component='p'
                to={routes.vehicle.base}
                label={t('menuOptions.manage') + ' ' + t('outVehicles')}
                icon={<VehicleIcon fontSize='small' />}
              />
            )}
          </Breadcrumb>
        </Grid>

        {(status === '' || status === 'loaded') && (
          <div>
            <Grid item xs={12} md={1}>
              <Switch
                {...label}
                checked={isVehicleParked}
                onChange={onChangeIsVehicleParked}
              />
            </Grid>

            <Grid>
              {isVehicleParked && 'manage parked'}
              {!isVehicleParked && 'manage out'}
            </Grid>
          </div>
        )}
      </Grid>

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
        <Grid container spacing={2} justifyContent='left' sx={{ p: 1 }}>
          <Grid item xs={12}>
            {isVehicleParked && (
              <ManageParkedVehicles parkedVehicles={parkedVehicles} />
            )}
            {!isVehicleParked && <ManageOutVehicles vehicles={outVehicles} />}
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default ManageVehicles;
