import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { getSettings as apiGetSettings } from '../lib/api';

export const getSettings = async ({
  queryClient = new QueryClient(),
  preview = false,
}) => {
  await queryClient.prefetchQuery('settings', () => apiGetSettings(preview));

  return { queryClient, dehydratedState: dehydrate(queryClient) };
};
