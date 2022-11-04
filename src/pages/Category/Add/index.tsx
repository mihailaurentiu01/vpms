import { Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';

import Breadcrumb from '../../../components/Breadcrumb';
import BreadcrumbStyled from '../../../components/Breadcrumb/styled';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CategoryIcon from '@mui/icons-material/Category';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';

import routes from '../../../helpers/routes';
import AddCategoryForm from '../../../components/Category/AddForm';
import { useParams } from 'react-router-dom';

const AddCategory = () => {
  const { t } = useTranslation();

  const params: { id?: string } = useParams();

  const isEditing = !!params!.id;

  return (
    <Box
      sx={{
        mt: 2,
        pl: 2,
      }}
    >
      <Typography align='left' variant='h4'>
        {!isEditing && t('addCategory')}
        {isEditing && t('editCategory')}
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
            {!isEditing && (
              <BreadcrumbStyled
                component='p'
                to={routes.category.add}
                label={t('addCategory')}
                icon={<AddIcon fontSize='small' />}
              />
            )}

            {isEditing && (
              <BreadcrumbStyled
                component='p'
                to={routes.category.edit}
                label={t('editCategory')}
                icon={<EditIcon fontSize='small' />}
              />
            )}
          </Breadcrumb>
        </Grid>
      </Grid>

      <Grid container spacing={2} justifyContent='left' sx={{ p: 1 }}>
        <Grid item xs={12}>
          <AddCategoryForm isEditing={isEditing} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddCategory;
