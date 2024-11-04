import React from 'react';
import {useTranslation} from 'react-i18next';

import {
  Avatar,
  IconButton,
  Menu,
  Tooltip,
  MenuItem,
  Divider,
  ListItemIcon,
  Stack,
} from '@mui/material';
import {Logout} from '@mui/icons-material';

import {useI18nNavigate} from '~/global/hooks/use-i18n-navigate';
import {useMatchLocation} from '~/global/hooks/use-match-location';

import {ApiUser} from '~/api-client/types';

import {AppButton} from '../../../app-button';

//
//

export const HeaderNavbarAuthenticated = ({profile}: {profile: ApiUser}) => {
  const {t} = useTranslation();
  const navigate = useI18nNavigate();
  const matchLocation = useMatchLocation();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  //

  const doLogout = () => {
    window.localStorage.clear();
    window.location.pathname = '/';
  };

  //
  //

  return (
    <Stack direction="row">
      <Tooltip title="Account settings">
        <IconButton
          onClick={handleClick}
          size="medium"
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <Avatar alt={profile.name} sx={{bgcolor: 'primary.main'}} />
        </IconButton>
      </Tooltip>
      <Menu
        elevation={0}
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 12px rgba(0,0,0,0.1))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
      >
        <MenuItem onClick={() => navigate('/profile')}>
          <Avatar /> My account
        </MenuItem>
        <Divider />
        <MenuItem onClick={doLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>

      <AppButton
        sx={{py: 1}}
        size="large"
        disableRipple
        color={matchLocation('/') ? 'primary' : 'inherit'}
        to="/"
      >
        {t('common:home')}
      </AppButton>

      <AppButton
        sx={{py: 1}}
        size="large"
        disableRipple
        color={matchLocation('/products') ? 'primary' : 'inherit'}
        to="/products"
      >
        {t('common:products')}
      </AppButton>

      <AppButton
        sx={{py: 1}}
        size="large"
        disableRipple
        color={matchLocation('/categories') ? 'primary' : 'inherit'}
        to="/categories"
      >
        {t('common:categories')}
      </AppButton>
    </Stack>
  );
};
