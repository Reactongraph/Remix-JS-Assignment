import {Link} from '@remix-run/react';

import {useLanguageChanger} from '~/global/hooks/use-language-changer';

//
//

export const HeaderNavbarLocale = () => {
  const locale = useLanguageChanger();

  if (locale.current === 'en')
    return (
      <Link
        to={locale.getLanguageURL('ar')}
        color="inherit"
        style={{color: 'inherit', textDecoration: 'none', fontSize: '1.6rem'}}
      >
        🇸🇦
      </Link>
    );

  return (
    <Link
      to={locale.getLanguageURL('en')}
      color="inherit"
      style={{color: 'inherit', textDecoration: 'none', fontSize: '1.6rem'}}
    >
      🇺🇸
    </Link>
  );
};
