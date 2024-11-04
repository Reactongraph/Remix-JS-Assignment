import {apiClient, handleApiError} from './client';
import {ApiAuth, ApiOptions, ApiPayload, ApiResponse, ApiUser} from './types';

//
//

export type apiSignInPayload = ApiPayload<{email: string; password: string}>;
export type apiSignInResponse = ApiResponse<ApiAuth>;

export const apiSignIn = async ({payload, options}: apiSignInPayload) => {
  try {
    return await apiClient
      .post('auth/signin/', {json: payload, ...options})
      .json<apiSignInResponse>();
  } catch (err) {
    return handleApiError(err);
  }
};

//
type apiSignUpObject = {
  name: string;
  email: string;
  mobile: string;
  password: string;
  passwordConfirm: string;
};

export type apiSignUpPayload = ApiPayload<apiSignUpObject>;
export type apiSignUpResponse = ApiResponse<ApiAuth>;

export const apiSignUp = async ({payload, options}: apiSignUpPayload) => {
  try {
    return await apiClient
      .post<apiSignUpResponse>('auth/signup/', {json: payload, ...options})
      .json();
  } catch (err) {
    return handleApiError(err);
  }
};

//

export type apiProfileGetPayload = ApiOptions;
export type apiProfileGetResponse = ApiResponse<ApiUser>;

export const apiProfileGet = async ({options}: apiProfileGetPayload = {}) => {
  try {
    return await apiClient
      .get('auth/profile/', {cache: 'default', ...options})
      .json<apiProfileGetResponse>();
  } catch (err) {
    return handleApiError(err);
  }
};

//

export type apiProfileUpdatePayload = ApiPayload<Partial<apiSignUpObject>>;
export type apiProfileUpdateResponse = ApiResponse<ApiUser>;

export const apiProfileUpdate = async ({payload, options}: apiProfileUpdatePayload) => {
  try {
    return await apiClient
      .patch<apiProfileUpdateResponse>('auth/profile/', {
        json: {
          ...payload,
          password: payload.password || undefined,
          passwordConfirm: payload.passwordConfirm || undefined,
        },
        ...options,
      })
      .json();
  } catch (err) {
    return handleApiError(err);
  }
};
