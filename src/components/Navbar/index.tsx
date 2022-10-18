import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { APP_NAME } from '../../helpers/constants';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import routes from '../../helpers/routes';

import styles from './Navbar.module.css';

const Navbar = () => {
  const { t } = useTranslation();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            {APP_NAME}
          </Typography>
          <NavLink to={routes.login}>
            <Button color='inherit'>{t('admin')}</Button>
          </NavLink>

          <Button color='inherit'>{t('users')}</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
