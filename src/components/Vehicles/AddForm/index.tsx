import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useTranslation } from 'react-i18next';
import { Button } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

import useInput from '../../../hooks/useInput';

import { useHistory } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { RootState } from '../../../app/store';

import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Vehicle from '../../../models/Vehicle';
import { createVehicle } from '../../../modules/vehicle/vehicleSlice';
import React from 'react';

const AddVehicleForm = () => {
  const { t } = useTranslation();

  const { loggedInUser } = useAppSelector((state: RootState) => state.auth);
  const { status } = useAppSelector((state: RootState) => state.vehicle);
  const { categories } = useAppSelector((state: RootState) => state.category);

  const history = useHistory();

  const dispatch = useAppDispatch();

  const {
    value: categoryIdValue,
    setValue: setCategoryIdValue,
    clearValue: clearCategoryIdValue,
    clearHasBeenTouched: clearCategoryNameHasBeenTouchedValue,
    onSelectValueHandler: onChangeCategoryNameHandler,
    onBlurHandler: onBlurCategoryNameHandler,
    hasBeenTouched: hasCategoryNameBeenTouched,
    isValueValid: isCategoryNameValid,
  } = useInput<string>((val) => val.length > 0);

  const {
    value: vehicleCompanyValue,
    setValue: setVehicleCompanyValue,
    clearValue: clearVehicleCompanyValue,
    clearHasBeenTouched: clearVehicleCompanyHasBeenTouchedValue,
    onChangeValueHandler: onChangeVehicleCompanyHandler,
    onBlurHandler: onBlurVehicleCompanyHandler,
    hasBeenTouched: hasVehicleCompanyBeenTouched,
    isValueValid: isVehicleCompanyValid,
  } = useInput<string>((val) => val.length > 0);

  const {
    value: registrationNumberValue,
    setValue: setRegistrationNumberValue,
    clearValue: clearRegistrationNumberValue,
    clearHasBeenTouched: clearRegistrationNumberHasBeenTouchedValue,
    onChangeValueHandler: onChangeRegistrationNumberHandler,
    onBlurHandler: onBlurRegistrationNumberHandler,
    hasBeenTouched: hasRegistrationNumberBeenTouched,
    isValueValid: isRegistrationNumberValid,
  } = useInput<string>((val) => val.length > 0);

  const {
    value: ownerNameValue,
    setValue: setOwnerNameValue,
    clearValue: clearOwnerNameValue,
    clearHasBeenTouched: clearOwnerNameHasBeenTouchedValue,
    onChangeValueHandler: onChangeOwnerNameHandler,
    onBlurHandler: onBlurOwnerNameHandler,
    hasBeenTouched: hasOwnerNameBeenTouched,
    isValueValid: isOwnerNameValid,
  } = useInput<string>((val) => val.length > 0);

  const {
    value: contactNumberValue,
    onChangeValueHandler: onChangeContactNumberValue,
    isValueValid: isContactNumberValueValid,
    hasBeenTouched: hasContactNumberValueBeenTouched,
    onBlurHandler: onBlurContactNumberValueHandler,
  } = useInput<number>(
    (val) =>
      val > 0 &&
      new RegExp(
        /(297|93|244|1264|358|355|376|971|54|374|1684|1268|61|43|994|257|32|229|226|880|359|973|1242|387|590|375|501|1441|591|55|1246|673|975|267|236|1|61|41|56|86|225|237|243|242|682|57|269|238|506|53|5999|61|1345|357|420|49|253|1767|45|1809|1829|1849|213|593|20|291|212|34|372|251|358|679|500|33|298|691|241|44|995|44|233|350|224|590|220|245|240|30|1473|299|502|594|1671|592|852|504|385|509|36|62|44|91|246|353|98|964|354|972|39|1876|44|962|81|76|77|254|996|855|686|1869|82|383|965|856|961|231|218|1758|423|94|266|370|352|371|853|590|212|377|373|261|960|52|692|389|223|356|95|382|976|1670|258|222|1664|596|230|265|60|262|264|687|227|672|234|505|683|31|47|977|674|64|968|92|507|64|51|63|680|675|48|1787|1939|850|351|595|970|689|974|262|40|7|250|966|249|221|65|500|4779|677|232|503|378|252|508|381|211|239|597|421|386|46|268|1721|248|963|1649|235|228|66|992|690|993|670|676|1868|216|90|688|886|255|256|380|598|1|998|3906698|379|1784|58|1284|1340|84|678|681|685|967|27|260|263)(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{4,20}$/
      ).test(String(val))
  );

  const isFormValid =
    isCategoryNameValid &&
    isVehicleCompanyValid &&
    isRegistrationNumberValid &&
    isOwnerNameValid &&
    isContactNumberValueValid;

  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isFormValid) {
      const vehicle = new Vehicle(
        categoryIdValue,
        vehicleCompanyValue,
        registrationNumberValue,
        ownerNameValue,
        contactNumberValue,
        loggedInUser!.id
      );

      const categoryNameValue: string | undefined = categories.find(
        (category) => category.id === categoryIdValue
      )?.name;

      vehicle.setCategoryName(categoryNameValue as string);

      dispatch(createVehicle(vehicle));
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
                  <InputLabel id='select-category'>{t('category')}</InputLabel>
                  <Select
                    labelId='select-category'
                    id='select-note-category'
                    value={categoryIdValue}
                    sx={{ minWidth: '100%' }}
                    label={t('category')}
                    onChange={onChangeCategoryNameHandler}
                  >
                    {React.Children.toArray(
                      categories?.map((category, index) => {
                        return (
                          <MenuItem key={category.id} value={category.id}>
                            {category.name}
                          </MenuItem>
                        );
                      })
                    )}
                  </Select>
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    value={vehicleCompanyValue}
                    error={
                      !isVehicleCompanyValid && hasVehicleCompanyBeenTouched
                    }
                    helperText={t('requiredField')}
                    onChange={onChangeVehicleCompanyHandler}
                    onBlur={onBlurVehicleCompanyHandler}
                    sx={{ width: { xs: 1, md: 1 } }}
                    type='text'
                    label={t('vehicleCompany')}
                    variant='outlined'
                    required
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    value={registrationNumberValue}
                    error={
                      !isRegistrationNumberValid &&
                      hasRegistrationNumberBeenTouched
                    }
                    helperText={t('requiredField')}
                    onChange={onChangeRegistrationNumberHandler}
                    onBlur={onBlurRegistrationNumberHandler}
                    sx={{ width: { xs: 1, md: 1 } }}
                    type='text'
                    label={t('registrationNumber')}
                    variant='outlined'
                    required
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    value={ownerNameValue}
                    error={!isOwnerNameValid && hasOwnerNameBeenTouched}
                    helperText={t('requiredField')}
                    onChange={onChangeOwnerNameHandler}
                    onBlur={onBlurOwnerNameHandler}
                    sx={{ width: { xs: 1, md: 1 } }}
                    type='text'
                    label={t('ownerName')}
                    variant='outlined'
                    required
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    value={contactNumberValue}
                    error={
                      !isContactNumberValueValid &&
                      hasContactNumberValueBeenTouched
                    }
                    helperText={t('requiredField')}
                    onChange={onChangeContactNumberValue}
                    onBlur={onBlurContactNumberValueHandler}
                    sx={{ width: { xs: 1, md: 1 } }}
                    type='number'
                    label={t('contactNumber')}
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

export default AddVehicleForm;
