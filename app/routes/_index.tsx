import {useTranslation} from 'react-i18next';
import type {MetaFunction, LoaderFunction} from '@remix-run/node';

import {Grid2, Typography} from '@mui/material';

import {useQueryProfile} from '~/services/auth';

import {AppLink} from '~/global/components/app-link';

// Meta function to set the page title
export const meta: MetaFunction = () => [{title: 'Remix App'}];

// Loader function to return an empty string
export const loader: LoaderFunction = async () => {
  // You can include any data fetching logic here if needed
  return ''; // Return an empty string or any required data
};

console.log('main file called');

// Main component
export default function Index() {
  console.log('main file called inside Index');

  const {t} = useTranslation();
  console.log('translation test for hello:', t('hello')); // Log the translation for 'hello'

  const {data} = useQueryProfile({enabled: !!window.localStorage.getItem('_at')});
  console.log('data:', data); // Log data directly
  console.log('data as JSON:', JSON.stringify(data, null, 2)); // Log data as JSON string

  return (
    <Grid2
      container
      direction="column"
      spacing={6}
      alignContent="center"
      alignItems="center"
      mt="15%"
    >
      <Typography variant="h3" align="center" sx={{fontWeight: 500}}>
        {t('hello')}
      </Typography>

      <AppLink to="/sign-in">
        <Typography variant="h5">Get Started</Typography>
      </AppLink>
    </Grid2>
  );
}
