import { Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import Breadcrumb from '../../../../components/Breadcrumb';
import BreadcrumbStyled from '../../../../components/Breadcrumb/styled';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CategoryIcon from '@mui/icons-material/Category';
import VehicleIcon from '@mui/icons-material/TimeToLeave';
import ParkingIcon from '@mui/icons-material/LocalParking';
import TableCell from '@mui/material/TableCell';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import DetailsIcon from '@mui/icons-material/Details';
import routes from '../../../../helpers/routes';
import Table from '../../../../components/Table/index';
import { useAppSelector } from '../../../../app/hooks';
import { RootState } from '../../../../app/store';
import VehicleDetailsForm from '../../../../components/Vehicles/DetailsForm';

const DetailsParkedVehicle = () => {
  const { t } = useTranslation();

  const { selectedVehicle } = useAppSelector(
    (state: RootState) => state.vehicle
  );

  const headCells = [
    {
      id: 'id',
      numeric: false,
      disablePadding: true,
      label: '#',
    },
    {
      id: 'categoryName',
      numeric: false,
      disablePadding: false,
      label: t('categoryName'),
    },
    {
      id: 'company',
      numeric: false,
      disablePadding: false,
      label: t('vehicleCompany'),
    },
    {
      id: 'registrationNumber',
      numeric: false,
      disablePadding: false,
      label: t('registrationNumber'),
    },
    {
      id: 'owner',
      numeric: false,
      disablePadding: false,
      label: t('ownerName'),
    },
    {
      id: 'contactNumber',
      numeric: false,
      disablePadding: false,
      label: t('contactNumber'),
    },
    {
      id: 'creationDate',
      numeric: false,
      disablePadding: false,
      label: t('creationDate'),
    },
    {
      id: 'status',
      numeric: false,
      disablePadding: false,
      label: t('status'),
    },
  ];

  const onRenderRow = (row: any) => {
    return (
      <>
        <TableCell align='left'>{row.categoryName}</TableCell>
        <TableCell align='left'>{row.company}</TableCell>
        <TableCell align='left'>{row.registrationNumber}</TableCell>
        <TableCell align='left'>{row.owner}</TableCell>
        <TableCell align='left'>{row.contactNumber}</TableCell>
        <TableCell align='left'>{row.creationDate}</TableCell>
        <TableCell align='left'>{row.status}</TableCell>
      </>
    );
  };

  return (
    <Box
      sx={{
        mt: 2,
        pl: 2,
      }}
    >
      <Typography align='left' variant='h4'>
        {t('viewIncomingVehicle')}
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
            <BreadcrumbStyled
              component='p'
              to={routes.vehicle.details}
              label={t('viewDetails')}
              icon={<DetailsIcon fontSize='small' />}
            />
          </Breadcrumb>
        </Grid>
      </Grid>

      <Grid container spacing={2} justifyContent='left' sx={{ p: 1 }}>
        <Grid item xs={12}>
          <Table
            headCells={headCells}
            rows={[selectedVehicle]}
            includesToolbar={true}
            isDeleteAllowed={false}
            isViewDetailsAllowed={false}
            isEditingAllowed={false}
            headTitle={t('viewIncomingVehicle')}
            onRenderRow={onRenderRow}
          />
        </Grid>
      </Grid>

      <Grid container spacing={2} justifyContent='left' sx={{ p: 1 }}>
        <Grid item xs={12}>
          <VehicleDetailsForm />
        </Grid>
      </Grid>
    </Box>
  );
};

export default DetailsParkedVehicle;
