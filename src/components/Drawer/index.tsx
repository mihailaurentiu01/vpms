import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import { NavLink } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CategoryIcon from '@mui/icons-material/Category';

import routes from '../../helpers/routes';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

type Anchor = 'top' | 'left' | 'bottom' | 'right';
const defaultAnchor: Anchor = 'left';

const CustomDrawer = () => {
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const [openCollapsedMenuCategory, setOpenCollapsedMenuCategory] =
    useState(false);

  const { t } = useTranslation();

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const onOpenCollapsedMenuCategoryHandler = (e: React.MouseEvent) => {
    setOpenCollapsedMenuCategory((prevState: boolean) => {
      return !prevState;
    });
  };

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role='presentation'
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem disablePadding onClick={toggleDrawer(anchor, false)}>
          <NavLink to={routes.dashboard}>
            <ListItemButton>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>

              <ListItemText primary={t('menuOptions.dashboard')} />
            </ListItemButton>
          </NavLink>
        </ListItem>

        <ListItemButton onClick={onOpenCollapsedMenuCategoryHandler}>
          <ListItemIcon>
            <CategoryIcon />
          </ListItemIcon>
          <ListItemText primary={t('menuOptions.category')} />
          {openCollapsedMenuCategory ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={openCollapsedMenuCategory} timeout='auto' unmountOnExit>
          <List component='div' disablePadding>
            <NavLink to={routes.category.add}>
              <ListItemButton
                sx={{ pl: 9 }}
                onClick={toggleDrawer(anchor, false)}
              >
                <ListItemText primary={t('menuOptions.add')} />
              </ListItemButton>
            </NavLink>

            <NavLink to={routes.category.base}>
              <ListItemButton
                sx={{ pl: 9 }}
                onClick={toggleDrawer(anchor, false)}
              >
                <ListItemText primary={t('menuOptions.manage')} />
              </ListItemButton>
            </NavLink>
          </List>
        </Collapse>
      </List>
    </Box>
  );

  return (
    <div>
      <IconButton
        onClick={toggleDrawer(defaultAnchor, true)}
        size='large'
        edge='start'
        color='inherit'
        aria-label='menu'
        sx={{ mr: 2 }}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        anchor={defaultAnchor}
        open={state[defaultAnchor]}
        onClose={toggleDrawer(defaultAnchor, false)}
      >
        {list(defaultAnchor)}
      </Drawer>
    </div>
  );
};

export default CustomDrawer;
