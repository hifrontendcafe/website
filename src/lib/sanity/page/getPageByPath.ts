import { FilteredResponseQueryOptions } from 'next-sanity';
import client from '..';
import { pageByPathQuery } from '../../queries';
import { Page } from '../../types';

interface GetPageByPathProps {
  path: string;
}

export async function getPageByPath(
  { path }: GetPageByPathProps,
  options?: FilteredResponseQueryOptions,
) {
  return client.fetch<Page, GetPageByPathProps>(
    pageByPathQuery,
    { path },
    options,
  );
}
