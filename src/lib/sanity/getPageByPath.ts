import client from '.';
import { pageByPathQuery } from '../queries';
import { Page } from '../types';

interface GetPageByPathProps {
  path: string;
}

export async function getPageByPath(
  { path }: GetPageByPathProps,
  next?: RequestInit['next'],
) {
  return client.fetch<Page, GetPageByPathProps>(
    pageByPathQuery,
    { path },
    { next },
  );
}
