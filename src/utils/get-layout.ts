import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { getSettings } from '../lib/api';

export const getLayout = async ({
  locale = 'en',
  queryClient = new QueryClient(),
  preview = false,
}) => {
  await queryClient.prefetchQuery('settings', () =>
    getSettings(locale, preview),
  );

  return { queryClient, dehydratedState: dehydrate(queryClient) };
};
