import {createMutation, createQuery} from 'react-query-kit';

import {
  apiCategoriesCreate,
  apiCategoriesCreatePayload,
  apiCategoriesCreateResponse,
  apiCategoriesDelete,
  apiCategoriesDeletePayload,
  apiCategoriesDeleteResponse,
  apiCategoriesGet,
  apiCategoriesGetPayload,
  apiCategoriesGetResponse,
  apiCategoriesList,
  apiCategoriesListPayload,
  apiCategoriesListResponse,
  apiCategoriesUpdate,
  apiCategoriesUpdatePayload,
  apiCategoriesUpdateResponse,
} from '~/api-client/categories';

import {queryClient} from './client';

//
//

const key = 'categories';
const refetchListNoCache = async () =>
  queryClient.fetchQuery({
    ...useQueryCategoriesList.getFetchOptions({options: {cache: 'no-cache'}}),
    queryKey: [key],
  });

//

export const useQueryCategoriesList = createQuery<
  apiCategoriesListResponse,
  apiCategoriesListPayload | undefined
>({
  queryKey: [key],
  fetcher: params => apiCategoriesList(params),
});

//

export const useQueryCategoriesGet = createQuery<apiCategoriesGetResponse, apiCategoriesGetPayload>(
  {
    queryKey: [key],
    fetcher: params => apiCategoriesGet(params),
  },
);

//

export const useMutationCategoriesCreate = createMutation<
  apiCategoriesCreateResponse,
  apiCategoriesCreatePayload
>({
  mutationKey: [key + 'Create'],
  mutationFn: params => apiCategoriesCreate(params),
  onSuccess: refetchListNoCache,
});

//

export const useMutationCategoriesUpdate = createMutation<
  apiCategoriesUpdateResponse,
  apiCategoriesUpdatePayload
>({
  mutationKey: [key + 'Update'],
  mutationFn: params => apiCategoriesUpdate(params),
  onSuccess: refetchListNoCache,
});

//

export const useMutationCategoriesDelete = createMutation<
  apiCategoriesDeleteResponse,
  apiCategoriesDeletePayload
>({
  mutationKey: [key + 'Delete'],
  mutationFn: params => apiCategoriesDelete(params),
  onSuccess: refetchListNoCache,
});
