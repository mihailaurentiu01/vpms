import { Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';

import Breadcrumb from '../../../components/Breadcrumb';
import BreadcrumbStyled from '../../../components/Breadcrumb/styled';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddIcon from '@mui/icons-material/Add';

import routes from '../../../helpers/routes';
import CarIcon from '@mui/icons-material/TimeToLeave';
import AddVehicleForm from '../../../components/Vehicles/AddForm';
import { getCategories } from '../../../modules/category/categorySlice';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { RootState } from '../../../app/store';
import CircularProgress from '@mui/material/CircularProgress';

const AddVehicle = () => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const { status } = useAppSelector((state: RootState) => state.category);

  useEffect(() => {
    dispatch(getCategories());
  }, [getCategories]);

  return (
    <Box
      sx={{
        mt: 2,
        pl: 2,
      }}
    >
      <Typography align='left' variant='h4'>
        {t('addVehicle')}
      </Typography>
      <Grid container spacing={2} justifyContent='left' sx={{ p: 0, mb: 2 }}>
        <Grid item xs={12}>
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
              icon={<CarIcon fontSize='small' />}
            />
            <BreadcrumbStyled
              component='p'
              to={routes.vehicle.add}
              label={t('addVehicle')}
              icon={<AddIcon fontSize='small' />}
            />
          </Breadcrumb>
        </Grid>
      </Grid>

      <Grid container spacing={2} justifyContent='left' sx={{ p: 1 }}>
        <Grid item xs={12}>
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
          {(status === '' || status === 'loaded') && <AddVehicleForm />}
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddVehicle;
