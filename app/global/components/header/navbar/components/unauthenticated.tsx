import {useTranslation} from 'react-i18next';

import {Typography} from '@mui/material';

import {useMatchLocation} from '~/global/hooks/use-match-location';

import {AppButton} from '../../../app-button';

//
//

export const HeaderNavbarUnauthenticated = () => {
  const {t} = useTranslation(['auth']);
  const matchLocation = useMatchLocation();

  return (
    <>
      <AppButton
        sx={{py: 1}}
        size="large"
        disableRipple
        color={matchLocation('/') ? 'primary' : 'inherit'}
        to="/"
      >
        {t('common:home')}
      </AppButton>
      <Typography mx={1}></Typography>
      <AppButton
        sx={{py: 1}}
        size="large"
        disableRipple
        color={matchLocation('/sign-up') ? 'primary' : 'inherit'}
        to="/sign-up"
      >
        {t('auth:signUp.title')}
      </AppButton>
      <Typography mx={1}></Typography>
      <AppButton
        sx={{py: 1}}
        size="large"
        disableRipple
        color={matchLocation('/sign-in') ? 'primary' : 'inherit'}
        to="/sign-in"
      >
        {t('auth:signIn.title')}
      </AppButton>
    </>
  );
};
