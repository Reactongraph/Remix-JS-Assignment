import ky, {HTTPError, KyRequest} from 'ky';

import {ApiAuth, ApiResponse} from './types';
import {apiClearTokens, apiSaveTokens} from './utils/tokens';

//
//

export const apiClient = ky.create({
  prefixUrl: 'https://demo-api.zid.dev',
  // prefixUrl: 'http://localhost:4000',
  headers: {
    Accept: 'application/json',
    'x-api-key': '5MrTJEleujMaoWtIjG3CxFV3ATdioune',
  },
  // cache: 'no-cache',
  retry: 2,
  hooks: {
    beforeRequest: [async request => tokenInterceptor(request)],
    beforeError: [async error => errorHandler(error)],
  },
});

//

export const handleApiError = <T = ApiResponse<never>>(err: unknown) => {
  if (err instanceof HTTPError && err?.response?.status <= 400) return err.response?.json<T>();

  throw err;
};

//
//

const errorHandler = async (error: HTTPError) => {
  if (error.response.status === 401) {
    apiClearTokens();
  }

  return error;
};

const tokenInterceptor = async (request: KyRequest) => {
  if (request.headers.get('x-target') === 'refresh-token') return;

  const currentToken = window.localStorage.getItem('_at');

  if (!currentToken) return;

  const currentTokenExpires = window.localStorage.getItem('_ate');
  const currentTokenExpired = currentTokenExpires && new Date(currentTokenExpires) < new Date();

  if (!currentTokenExpired) {
    request.headers.set('Authorization', `Bearer ${currentToken}`);

    return;
  }

  const currentRefresh = window.localStorage.getItem('_rt');

  if (!currentRefresh) return;

  const currentRefreshExpires = window.localStorage.getItem('_rte');
  const currentRefreshExpired =
    currentRefreshExpires && new Date(currentRefreshExpires) < new Date();

  if (currentRefreshExpired) {
    apiClearTokens();

    return;
  }

  try {
    const result = await apiClient
      .post('auth/refresh-token', {
        json: {token: currentRefresh},
        headers: {'x-target': 'refresh-token'},
      })
      .json<ApiResponse<ApiAuth>>();

    if (result?.result?.accessToken?.token) {
      apiSaveTokens(result);

      request.headers.set('Authorization', `Bearer ${result.result.accessToken.token}`);
    }
  } catch (err) {
    console.warn('Token refresh failed', err);
  }
};
