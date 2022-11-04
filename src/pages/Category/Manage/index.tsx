import { Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import Breadcrumb from '../../../components/Breadcrumb';
import BreadcrumbStyled from '../../../components/Breadcrumb/styled/index';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CategoryIcon from '@mui/icons-material/Category';
import Table from '../../../components/Table/index';
import TableCell from '@mui/material/TableCell';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import routes from '../../../helpers/routes';

import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { RootState } from '../../../app/store';
import { getCategories } from '../../../modules/category/categorySlice';

const ManageCategory = () => {
  const [openDialog, setOpenDialog] = useState(false);

  const { t } = useTranslation();

  const history = useHistory();
  const location = useLocation();

  const { status, categories } = useAppSelector(
    (state: RootState) => state.category
  );
  const dispatch = useAppDispatch();

  const headCells = [
    {
      id: 'id',
      numeric: false,
      disablePadding: true,
      label: '#',
    },
    {
      id: 'name',
      numeric: false,
      disablePadding: false,
      label: t('menuOptions.category'),
    },
    {
      id: 'creationDate',
      numeric: false,
      disablePadding: false,
      label: t('creationDate'),
    },
  ];

  const onEditHandler = (id: string) => {
    history.push(location.pathname + '/' + id);
  };

  const onDeleteHandler = (selected: string[]) => {
    console.log(selected);
  };

  const onDeleteConfirmHandler = () => {
    console.log('delete');
  };

  const onCloseDialogHandler = (e: React.MouseEvent) => {
    setOpenDialog(false);
  };

  useEffect(() => {
    dispatch(getCategories());
  }, [getCategories]);

  const onRenderRow = (row: any) => {
    return (
      <>
        <TableCell align='left'>{row.name}</TableCell>
        <TableCell align='left'>{row.creationDate}</TableCell>
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
        {t('manageCategory')}
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
              to={routes.category.base}
              label={t('menuOptions.category')}
              icon={<CategoryIcon fontSize='small' />}
            />
          </Breadcrumb>
        </Grid>
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
            <Table
              headCells={headCells}
              rows={categories}
              includesToolbar={true}
              isDeleteAllowed={true}
              isEditingAllowed={true}
              headTitle={t('categoryDetails')}
              onEdit={onEditHandler}
              onDelete={onDeleteHandler}
              onRenderRow={onRenderRow}
            />
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default ManageCategory;
