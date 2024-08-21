import { FilteredResponseQueryOptions } from 'next-sanity';
import client from '..';
import { docsQuery } from '../../queries';
import { Doc } from './getDocBySlug';

export async function getAllDocs(options?: FilteredResponseQueryOptions) {
  return client.fetch<Doc[]>(docsQuery, {}, options);
}
