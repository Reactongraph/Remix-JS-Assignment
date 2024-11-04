import * as React from 'react';

import Container from '@mui/material/Container';
import {Grid2} from '@mui/material';

import {HeaderNavbar} from '~/global/components/header/navbar';

export default function Layout({children}: {children: React.ReactNode}) {
  return (
    <>
      <HeaderNavbar />
      <Grid2
        container
        spacing={2}
        minHeight="100vh"
        paddingTop="6rem"
        justifyContent="center"
        alignItems="flex-start"
        pb={6}
      >
        <Container maxWidth="md">{children}</Container>
      </Grid2>
    </>
  );
}
