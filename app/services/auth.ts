import {createMutation, createQuery} from 'react-query-kit';

import {
  apiProfileGet,
  apiProfileGetPayload,
  apiProfileGetResponse,
  apiProfileUpdate,
  apiProfileUpdatePayload,
  apiProfileUpdateResponse,
  apiSignIn,
  apiSignInPayload,
  apiSignInResponse,
  apiSignUp,
  apiSignUpPayload,
  apiSignUpResponse,
} from '~/api-client';

import {queryClient} from './client';

//
//

export const useQueryProfile = createQuery<apiProfileGetResponse, apiProfileGetPayload>({
  queryKey: ['profile'],
  fetcher: params => apiProfileGet(params),
});

//

export const useMutationProfileUpdate = createMutation<
  apiProfileUpdateResponse,
  apiProfileUpdatePayload
>({
  mutationKey: ['profile'],
  mutationFn: params => apiProfileUpdate(params),
  onSuccess: async data => await queryClient.setQueryData(['profile'], data),
});

//

export const useMutationSignIn = createMutation<apiSignInResponse, apiSignInPayload>({
  mutationKey: ['signIn'],
  mutationFn: params => apiSignIn(params),
  onSuccess: async data => await queryClient.setQueryData(['profile'], data),
});

//

export const useMutationSignUp = createMutation<apiSignUpResponse, apiSignUpPayload>({
  mutationKey: ['signUp'],
  mutationFn: params => apiSignUp(params),
});
