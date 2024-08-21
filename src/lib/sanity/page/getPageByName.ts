import { FilteredResponseQueryOptions } from 'next-sanity';
import client from '..';
import { pageQueryByName } from '../../queries';
import { Page } from '../../types';

interface GetPageByNameProps {
  name: string;
}

export async function getPageByName(
  { name }: GetPageByNameProps,
  options?: FilteredResponseQueryOptions,
) {
  return client.fetch<Page, GetPageByNameProps>(
    pageQueryByName,
    { name },
    {
      ...options,
      next: {
        ...options?.next,
        revalidate: options?.next?.revalidate || 120,
      },
    },
  );
}
