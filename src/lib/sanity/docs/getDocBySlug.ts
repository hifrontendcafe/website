import { FilteredResponseQueryOptions } from 'next-sanity';
import client from '..';
import { docQuery } from '../../queries';

export interface Doc {
  slug: string;
  title: string;
  body: any;
  content?: string;
}

interface GetDocBySlugProps {
  slug: string;
}

export async function getDocBySlug(
  { slug }: GetDocBySlugProps,
  options?: FilteredResponseQueryOptions,
) {
  return client.fetch<Doc, GetDocBySlugProps>(docQuery, { slug }, options);
}
