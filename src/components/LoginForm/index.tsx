import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import React from 'react';
import useInput from '../../hooks/useInput';

function LoginForm() {
  const { t } = useTranslation();

  const {
    value: usernameValue,
    onChangeValueHandler: onChangeUsernameValue,
    isValueValid: isUsernameValueValid,
    hasBeenTouched: hasUsernameValueBeenTouched,
    onBlurHandler: onBlurUsernameValueHandler,
  } = useInput<string>((val) => val.length > 0);

  const {
    value: passwordValue,
    onChangeValueHandler: onChangePasswordValue,
    isValueValid: isPasswordValueValid,
    hasBeenTouched: hasPasswordValueBeenTouched,
    onBlurHandler: onBlurPasswordValueHandler,
  } = useInput<string>((val) => val.length > 7);

  const isFormValid = isUsernameValueValid && isPasswordValueValid;

  const onSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    if (isFormValid) {
    }
  };

  return (
    <>
      <Container maxWidth='md'>
        <Box
          sx={{
            bgcolor: '#cfe8fc',
            flexGrow: 1,
          }}
        >
          <Typography align='center' variant='h2'>
            {t('login')}
          </Typography>

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
                  value={usernameValue}
                  onChange={onChangeUsernameValue}
                  onBlur={onBlurUsernameValueHandler}
                  error={!isUsernameValueValid && hasUsernameValueBeenTouched}
                  sx={{ width: { xs: 1, md: 1 } }}
                  type='text'
                  label={t('signupForm.username')}
                  variant='outlined'
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={passwordValue}
                  onChange={onChangePasswordValue}
                  onBlur={onBlurPasswordValueHandler}
                  error={!isPasswordValueValid && hasPasswordValueBeenTouched}
                  sx={{ width: { xs: 1, md: 1 } }}
                  type='password'
                  label={t('signupForm.password')}
                  variant='outlined'
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type='submit'
                  sx={{ width: 1 }}
                  disabled={!isFormValid}
                  variant='contained'
                >
                  {t('login')}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default LoginForm;
