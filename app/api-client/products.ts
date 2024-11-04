import {apiClient, handleApiError} from './client';
import {ApiResponse, ApiProduct, ApiOptions, ApiPayload} from './types';

//
//

export type apiProductsListPayload = ApiOptions;
export type apiProductsListResponse = ApiResponse<ApiProduct[]>;

export const apiProductsList = async ({options}: apiProductsListPayload = {}) => {
  try {
    return await apiClient.get('v1/products/', options).json<apiProductsListResponse>();
  } catch (err) {
    return handleApiError(err);
  }
};

//

export type apiProductsGetPayload = {id: string} & ApiOptions;
export type apiProductsGetResponse = ApiResponse<ApiProduct>;

export const apiProductsGet = async ({id, options}: apiProductsGetPayload) => {
  try {
    return await apiClient.get('v1/products/' + id, options).json<apiProductsGetResponse>();
  } catch (err) {
    return handleApiError(err);
  }
};

//

export type apiProductsCreatePayload = ApiPayload<
  Omit<ApiProduct, 'productId' | 'userId' | 'createdAt' | 'updatedAt'>
>;
export type apiProductsCreateResponse = apiProductsGetResponse;

export const apiProductsCreate = async ({payload, options}: apiProductsCreatePayload) => {
  try {
    return await apiClient
      .post<apiProductsCreateResponse>('v1/products/', {json: payload, ...options})
      .json();
  } catch (err) {
    return handleApiError(err);
  }
};

//

export type apiProductsUpdatePayload = {id: string} & ApiPayload<
  Partial<apiProductsCreatePayload['payload']>
>;
export type apiProductsUpdateResponse = apiProductsGetResponse;

export const apiProductsUpdate = async ({id, payload, options}: apiProductsUpdatePayload) => {
  try {
    return await apiClient
      .patch<apiProductsUpdateResponse>('v1/products/' + id, {json: payload, ...options})
      .json();
  } catch (err) {
    return handleApiError(err);
  }
};

//

export type apiProductsDeletePayload = apiProductsGetPayload;
export type apiProductsDeleteResponse = apiProductsGetResponse;

export const apiProductsDelete = async ({id, options}: apiProductsDeletePayload) => {
  try {
    return await apiClient.delete<apiProductsDeleteResponse>('v1/products/' + id, options).json();
  } catch (err) {
    return handleApiError(err);
  }
};
