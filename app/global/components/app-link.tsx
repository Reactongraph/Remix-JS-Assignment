import {LinkProps} from '@remix-run/react';

import {Link as MuiLink, LinkProps as MuiLinkProps} from '@mui/material';

import {I18nLink} from './i18n-link';

//
//

type MuiAppI18nLinkProps = LinkProps & Omit<MuiLinkProps, 'href'>;

export const AppLink: React.FC<MuiAppI18nLinkProps> = ({
  viewTransition = true,
  children,
  ...props
}: MuiAppI18nLinkProps) => {
  return (
    // @ts-expect-error - `to` is not allowed in MuiLinkProps
    <MuiLink viewTransition={viewTransition} LinkComponent={I18nLink} href={props.to} {...props}>
      {children}
    </MuiLink>
  );
};
