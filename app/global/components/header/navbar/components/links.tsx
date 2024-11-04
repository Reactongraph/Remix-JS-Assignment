import {useQueryProfile} from '~/services/auth';

import {HeaderNavbarUnauthenticated} from './unauthenticated';
import {HeaderNavbarSkeleton} from './skeleton';
import {HeaderNavbarAuthenticated} from './authenticated';

//
//

export const HeaderNavbarLinks = () => {
  const {data, isLoading} = useQueryProfile({enabled: !!window.localStorage.getItem('_at')});

  if (isLoading) return <HeaderNavbarSkeleton />;

  const profile = data?.result;

  if (profile?.userId) return <HeaderNavbarAuthenticated profile={profile} />;

  return <HeaderNavbarUnauthenticated />;
};
