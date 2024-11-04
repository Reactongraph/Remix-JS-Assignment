import type {MetaFunction} from '@remix-run/node';
import {redirect, useNavigate} from '@remix-run/react';
import {useTranslation} from 'react-i18next';
import {enqueueSnackbar} from 'notistack';

import {Stack, useMediaQuery, Box, Typography} from '@mui/material';

import {useMutationProductsDelete, useQueryProductsList} from '~/services/products';

import {SkeletonOnLoading} from '~/global/components/skeleton-on-loading';
import {AppButton} from '~/global/components/app-button';

import {ProductsTable} from './components/table';
import ProductCard from './components/productCard';

export const handle = {i18n: ['common', 'products']};
export const meta: MetaFunction = () => [{title: 'Remix App - Products'}];

export const clientLoader = async () => {
  if (!window.localStorage.getItem('_at')) return redirect('/');

  return null;
};

// Card component for mobile view

export default function Products() {
  const {t} = useTranslation(['common']);
  const {data, isLoading} = useQueryProductsList();
  const navigate = useNavigate();
  // Check if the screen width is smaller than the breakpoint for mobile (600px)
  const isMobile = useMediaQuery('(max-width:600px)');
  const deleteItem = useMutationProductsDelete();

  function handleEdit(productId: string) {
    navigate(`/products/${productId}`);
  }

  function handleDelete(productId: string) {
    deleteItem.mutate(
      {id: productId},
      {
        onSuccess: async result => {
          result?.meta?.message && enqueueSnackbar(result?.meta?.message, {variant: 'success'});
        },
        onError: err => {
          enqueueSnackbar(err?.message || 'unknown error', {variant: 'error'});
        },
      },
    );
  }

  return (
    <>
      <Stack alignItems="flex-end" my={2}>
        <SkeletonOnLoading isLoading={isLoading}>
          <AppButton to="/products/create" variant="contained">
            {t('common:create')}
          </AppButton>
        </SkeletonOnLoading>
      </Stack>

      {isMobile ? (
        <Box display="flex" flexDirection="column" gap={2}>
          {data?.result?.length ? (
            data.result?.map(product => (
              <ProductCard
                product={{
                  ...product,
                  priceSale: product.priceSale ?? 0,
                  image: product.image ?? null,
                }}
                key={product?.productId}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            ))
          ) : (
            <Typography>No products available</Typography>
          )}
        </Box>
      ) : (
        <ProductsTable data={data?.result} isLoading={isLoading} />
      )}
    </>
  );
}
