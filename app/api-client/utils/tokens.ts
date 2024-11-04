import {ApiAuth, ApiResponse} from '../types';

//
//

export const apiSaveTokens = async (result: ApiResponse<ApiAuth>) => {
  try {
    if (result?.result?.accessToken?.token && window?.localStorage) {
      window.localStorage.setItem('_at', result.result.accessToken.token);
      window.localStorage.setItem('_ate', result.result.accessToken.expiresAt);
      window.localStorage.setItem('_rt', result.result!.refreshToken!.token);
      window.localStorage.setItem('_rte', result.result!.refreshToken!.expiresAt);
    }
  } catch (err) {
    console.warn('Api save tokens failed', err);
  }
};

export const apiClearTokens = async () => {
  window?.localStorage?.removeItem('_at');
  window?.localStorage?.removeItem('_ate');
  window?.localStorage?.removeItem('_rt');
  window?.localStorage?.removeItem('_rte');
};
