import { QueryClient } from 'react-query';
import { dehydrate, DehydratedState } from 'react-query/hydration';
import { getSettings } from '../lib/api';

export const getLayout = async ({
  queryClient = new QueryClient(),
  preview = false,
}) => {
  await queryClient.prefetchQuery('settings', () => getSettings(preview));

  return { queryClient, dehydratedState: dehydrate(queryClient) };
};
