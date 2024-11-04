import {LinkProps} from '@remix-run/react';

import {Button, ButtonProps} from '@mui/material';

import {I18nLink} from './i18n-link';

//
//

export type AppButtonProps = LinkProps & ButtonProps;

export const AppButton: React.FC<AppButtonProps> = ({
  viewTransition = true,
  children,
  ...props
}: AppButtonProps) => {
  return (
    // @ts-expect-error - `LinkOwnProps` is not compatible with `ButtonProps`
    <Button viewTransition={viewTransition} LinkComponent={I18nLink} {...props}>
      {children}
    </Button>
  );
};
