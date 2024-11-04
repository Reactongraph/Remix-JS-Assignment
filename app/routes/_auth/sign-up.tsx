import type {MetaFunction} from '@remix-run/node';
import {Form, redirect} from '@remix-run/react';
import {useTranslation} from 'react-i18next';
import {useSnackbar} from 'notistack';
import * as yup from 'yup';
import {useForm, FormProvider} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';

import {useMutationSignUp} from '~/services/auth';

import {useI18nNavigate} from '~/global/hooks/use-i18n-navigate';

import {PageShell} from '~/global/components/page-shell';
import {AppInputPassword} from '~/global/components/app-input-password';
import {AppInput} from '~/global/components/app-input';

import {apiSaveTokens} from '~/api-client/utils/tokens';

//
//

// export const handle = {i18n: ['common', 'auth']};
export const meta: MetaFunction = () => [{title: 'Remix App - Sign Up'}];

export const clientLoader = async () => {
  if (window.localStorage.getItem('_at')) return redirect('/');

  return null;
};

//

const schema = yup
  .object({
    name: yup.string().min(3).max(40).required(),
    mobile: yup
      .string()
      .matches(
        /^(?:\+?\d{1,3})?\s?\d{10}$/,
        'Mobile number must be in the format +<country code> <number> (e.g., +1 1234567890)',
      ) // Adjust pattern as needed
      .required('Mobile number is required'),
    email: yup.string().email().required(),
    password: yup
      .string()
      .min(8, 'Password must have at least 8 characters')
      .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(/[0-9]/, 'Password must contain at least one number')
      .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character')
      .required('Password is required'),
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref('password')], 'Passwords must match')
      .required('Confirm password is required'),
  })
  .required();

//
//

export default function SignUp() {
  const {t} = useTranslation();
  const {enqueueSnackbar} = useSnackbar();
  const mutate = useMutationSignUp();
  const navigate = useI18nNavigate();

  const form = useForm({
    mode: 'onChange',
    defaultValues: {name: '', email: '', mobile: '', password: '', passwordConfirm: ''},
    resolver: yupResolver(schema),
  });

  //

  const onSubmit = form.handleSubmit(async payload => {
    const response = await mutate.mutateAsync({payload});

    if (response?.errors?.length) {
      enqueueSnackbar({
        heading: response?.meta?.message,
        messages: response?.errors,
        variant: 'error',
      });
    } else if (response?.result?.accessToken?.token) {
      enqueueSnackbar({
        heading: 'Account created successfully',
        messages: `Welcome aboard, ${response.result.user?.name}`,
        variant: 'success',
      });
      apiSaveTokens(response);
      navigate('/', {replace: true, viewTransition: true});
    }
  });

  const isLoading = mutate.isPending || !!mutate.data?.result;

  //
  //

  return (
    <FormProvider {...form}>
      <Form method="post" onSubmit={onSubmit}>
        <PageShell
          title={t('auth:signUp.title')}
          actionLabel={t('auth:signUp.title')}
          backLabel={t('auth:signUp.altAction')}
          backTo="/sign-in"
          isLoading={isLoading}
        >
          <AppInput name="name" label={t('common:name')} variant="filled" />

          <AppInput name="email" type="email" label={t('common:email')} variant="filled" />

          <AppInput name="mobile" type="tel" label={t('common:mobile')} variant="filled" />

          <AppInputPassword name="password" label={t('common:password')} variant="filled" />

          <AppInputPassword
            name="passwordConfirm"
            label={t('common:passwordConfirm')}
            variant="filled"
          />
        </PageShell>
      </Form>
    </FormProvider>
  );
}
