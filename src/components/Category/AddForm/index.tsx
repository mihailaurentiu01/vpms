import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useTranslation } from 'react-i18next';
import { Button } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

import useInput from '../../../hooks/useInput';

import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import routes from '../../../helpers/routes';
import Category from '../../../models/Category';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { RootState } from '../../../app/store';
import {
  createCategory,
  updateCategory,
} from '../../../modules/category/categorySlice';

const AddCategoryForm: React.FC<{ isEditing: boolean }> = (props) => {
  const { t } = useTranslation();

  const { isEditing } = props;

  const { loggedInUser } = useAppSelector((state: RootState) => state.auth);
  const { status } = useAppSelector((state: RootState) => state.category);
  const { selectedCategory } = useAppSelector(
    (state: RootState) => state.category
  );

  const history = useHistory();

  const dispatch = useAppDispatch();

  const {
    value: categoryNameValue,
    setValue: setCategoryNameValue,
    clearValue: clearCategoryNameValue,
    clearHasBeenTouched: clearCategoryNameHasBeenTouchedValue,
    onChangeValueHandler: onChangeCategoryNameHandler,
    onBlurHandler: onBlurCategoryNameHandler,
    hasBeenTouched: hasCategoryNameBeenTouched,
    isValueValid: isCategoryNameValid,
  } = useInput<string>((val) => val.length > 0);

  const isFormValid = isCategoryNameValid;

  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isFormValid && !isEditing) {
      const category = new Category(categoryNameValue, loggedInUser?.id);

      const res: any = await dispatch(createCategory(category));

      if (!res?.error) {
        history.push(routes.category.base);
      }
    } else if (isFormValid && isEditing) {
      const updatedCategory = new Category(categoryNameValue, loggedInUser?.id);

      updatedCategory.setId(selectedCategory!.id);

      const res: any = await dispatch(updateCategory(updatedCategory));

      if (!res?.error) {
        history.push(routes.category.base);
      }
    }
  };

  useEffect(() => {
    if (isEditing) {
      setCategoryNameValue(selectedCategory!.name);
    }
  }, [isEditing, selectedCategory]);

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
              bgcolor: '#cfe8fc',
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
                  <TextField
                    value={categoryNameValue}
                    error={!isCategoryNameValid && hasCategoryNameBeenTouched}
                    helperText={t('requiredField')}
                    onChange={onChangeCategoryNameHandler}
                    onBlur={onBlurCategoryNameHandler}
                    sx={{ width: { xs: 1, md: 1 } }}
                    type='email'
                    label={t('categoryName')}
                    variant='outlined'
                    required
                  />
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
        )}
      </Container>
    </>
  );
};

export default AddCategoryForm;
