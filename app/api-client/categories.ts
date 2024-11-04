import {apiClient, handleApiError} from './client';
import {ApiResponse, ApiCategory, ApiOptions, ApiPayload} from './types';

//
//

export type apiCategoriesListPayload = ApiOptions;
export type apiCategoriesListResponse = ApiResponse<ApiCategory[]>;

export const apiCategoriesList = async ({options}: apiCategoriesListPayload = {}) => {
  try {
    return await apiClient.get('v1/categories/', options).json<apiCategoriesListResponse>();
  } catch (err) {
    return handleApiError(err);
  }
};

//

export type apiCategoriesGetPayload = {id: string} & ApiOptions;
export type apiCategoriesGetResponse = ApiResponse<ApiCategory>;

export const apiCategoriesGet = async ({id, options}: apiCategoriesGetPayload) => {
  try {
    return await apiClient.get('v1/categories/' + id, options).json<apiCategoriesGetResponse>();
  } catch (err) {
    return handleApiError(err);
  }
};

//

export type apiCategoriesCreatePayload = ApiPayload<
  Omit<ApiCategory, 'categoryId' | 'userId' | 'createdAt' | 'updatedAt'>
>;
export type apiCategoriesCreateResponse = apiCategoriesGetResponse;

export const apiCategoriesCreate = async ({payload, options}: apiCategoriesCreatePayload) => {
  try {
    return await apiClient
      .post<apiCategoriesCreateResponse>('v1/categories/', {json: payload, ...options})
      .json();
  } catch (err) {
    return handleApiError(err);
  }
};

//

export type apiCategoriesUpdatePayload = {id: string} & ApiPayload<
  Partial<apiCategoriesCreatePayload['payload']>
>;
export type apiCategoriesUpdateResponse = apiCategoriesGetResponse;

export const apiCategoriesUpdate = async ({id, payload, options}: apiCategoriesUpdatePayload) => {
  try {
    return await apiClient
      .patch<apiCategoriesUpdateResponse>('v1/categories/' + id, {json: payload, ...options})
      .json();
  } catch (err) {
    return handleApiError(err);
  }
};

//

export type apiCategoriesDeletePayload = apiCategoriesGetPayload;
export type apiCategoriesDeleteResponse = apiCategoriesGetResponse;

export const apiCategoriesDelete = async ({id, options}: apiCategoriesDeletePayload) => {
  try {
    return await apiClient
      .delete<apiCategoriesDeleteResponse>('v1/categories/' + id, options)
      .json();
  } catch (err) {
    return handleApiError(err);
  }
};
