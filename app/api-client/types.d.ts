import {Options} from 'ky';

export interface ApiMeta {
  message?: string;
  total?: number;
  orderBy?: string;
  sortBy?: 'desc' | 'asc';
  offset?: number;
  limit?: number;
  pages?: number;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
}

export interface ApiResponse<T> {
  meta?: ApiMeta;
  result?: T;
  errors?: string[];
}

export interface ApiAuth {
  user?: ApiUser;
  accessToken?: ApiToken;
  refreshToken?: ApiToken;
}

export interface ApiToken {
  token: string;
  expiresAt: string;
}

export interface ApiUser {
  userId: string;
  name: string;
  email: string;
  mobile: string;
  roles: string[];
  createdAt: string;
  updatedAt?: string;
}

export interface ApiI18n {
  en: string;
  ar: string;
}

export interface ApiProduct {
  productId: string;
  userId: string;
  categoryId?: string | null;
  title: ApiI18n;
  description: ApiI18n;
  price: number;
  priceSale?: number | null;
  image?: string | null;
  sku?: string | null;
  quantity?: number | null;
  isActive?: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface ApiCategory {
  categoryId: string;
  userId: string;
  title: ApiI18n;
  isActive?: boolean;
  createdAt: string;
  updatedAt?: string;
}

export type ApiOptions = {
  options?: Options;
};

export type ApiPayload<T = unknown> = {payload: T} & ApiOptions;
