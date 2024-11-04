import {LinkProps, Path, useNavigate} from '@remix-run/react'; // eslint-disable-line no-restricted-imports
import {useTranslation} from 'react-i18next';

//
//

export const useI18nNavigate = () => {
  const {i18n} = useTranslation();
  const navigate = useNavigate();

  return (to: LinkProps['to'] | number, options?: Omit<LinkProps, 'reloadDocument' | 'to'>) => {
    const to2 = parseI18nNavigate(to, i18n.language);

    return navigate(to2 as string, options);
  };
};

//

const parseI18nNavigate = (to: LinkProps['to'] | number | Partial<Path>, lang: string) => {
  if (typeof to === 'number') to; // delta
  if (typeof to === 'string' && /^\./.test(to)) return to; // relative path
  if (typeof to === 'string') return '/' + lang + '/' + String(to).replace(/^\//, ''); // string
  if (typeof to === 'object' && to.pathname)
    return {...to, pathname: '/' + lang + '/' + String(to).replace(/^\//, '')}; // To object

  return to; // fallback
};
