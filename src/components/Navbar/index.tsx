import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { APP_NAME } from '../../helpers/constants';
import { useTranslation } from 'react-i18next';
import routes from '../../helpers/routes';
import Drawer from '../Drawer/index';

import styles from './Navbar.module.css';
import React from 'react';
import { useHistory } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../app/hooks';

// Actions
import { UserActions } from '../../modules/user/userSlice';
import { RootState } from '../../app/store';

const Navbar = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useAppDispatch();

  const { loggedIn } = useAppSelector((state: RootState) => state.auth);

  const goToLoginPageAdmin = (e: React.MouseEvent) => {
    dispatch(UserActions.setLoginAs('admin'));

    history.push(routes.login);
  };

  const goToLoginPageUser = (e: React.MouseEvent) => {
    dispatch(UserActions.setLoginAs('user'));

    history.push(routes.login);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          {loggedIn && <Drawer />}
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            {APP_NAME}
          </Typography>
          {!loggedIn && (
            <Button color='inherit' onClick={goToLoginPageAdmin}>
              {t('admin')}
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
