import {Avatar, Skeleton, Stack} from '@mui/material';

//
//

export const HeaderNavbarSkeleton = () => {
  return (
    <Stack spacing={2} direction="row" alignItems="center">
      <Skeleton variant="circular">
        <Avatar />
      </Skeleton>
      <Skeleton variant="text" width={50} />
      <Skeleton variant="text" width={50} />
      <Skeleton variant="text" width={50} />
    </Stack>
  );
};
