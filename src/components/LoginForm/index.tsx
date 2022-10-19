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
    value: emailValue,
    onChangeValueHandler: onChangeEmailHandler,
    isValueValid: isEmailValid,
  } = useInput<string>((val) => val.length > 0);

  const onSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    console.log('submited', isEmailValid);
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
                  value={emailValue}
                  onChange={onChangeEmailHandler}
                  sx={{ width: { xs: 1, md: 1 } }}
                  type='email'
                  label={t('signupForm.email')}
                  variant='outlined'
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  sx={{ width: { xs: 1, md: 1 } }}
                  type='password'
                  label={t('signupForm.password')}
                  variant='outlined'
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <Button type='submit' sx={{ width: 1 }} variant='contained'>
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
