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

import routes from '../../../../helpers/routes';

const DetailsParkedVehicle = () => {
  const { t } = useTranslation();

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
          </Breadcrumb>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DetailsParkedVehicle;
