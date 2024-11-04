import {createMutation, createQuery} from 'react-query-kit';

import {
  apiProductsCreate,
  apiProductsCreatePayload,
  apiProductsCreateResponse,
  apiProductsDelete,
  apiProductsDeletePayload,
  apiProductsDeleteResponse,
  apiProductsGet,
  apiProductsGetPayload,
  apiProductsGetResponse,
  apiProductsList,
  apiProductsListPayload,
  apiProductsListResponse,
  apiProductsUpdate,
  apiProductsUpdatePayload,
  apiProductsUpdateResponse,
} from '~/api-client/products';

import {queryClient} from './client';

//
//

const key = 'products';
const refetchListNoCache = async () =>
  queryClient.fetchQuery({
    ...useQueryProductsList.getFetchOptions({options: {cache: 'no-cache'}}),
    queryKey: [key],
  });

//

export const useQueryProductsList = createQuery<
  apiProductsListResponse,
  apiProductsListPayload | undefined
>({
  queryKey: [key],
  fetcher: params => apiProductsList(params),
});

//

export const useQueryProductsGet = createQuery<apiProductsGetResponse, apiProductsGetPayload>({
  queryKey: [key],
  fetcher: params => apiProductsGet(params),
});

//

export const useMutationProductsCreate = createMutation<
  apiProductsCreateResponse,
  apiProductsCreatePayload
>({
  mutationKey: [key + 'Create'],
  mutationFn: params => apiProductsCreate(params),
  onSuccess: refetchListNoCache,
});

//

export const useMutationProductsUpdate = createMutation<
  apiProductsUpdateResponse,
  apiProductsUpdatePayload
>({
  mutationKey: [key + 'Update'],
  mutationFn: params => apiProductsUpdate(params),
  onSuccess: refetchListNoCache,
});

//

export const useMutationProductsDelete = createMutation<
  apiProductsDeleteResponse,
  apiProductsDeletePayload
>({
  mutationKey: [key + 'Delete'],
  mutationFn: params => apiProductsDelete(params),
  onSuccess: refetchListNoCache,
});
