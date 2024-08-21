import { FilteredResponseQueryOptions } from 'next-sanity';
import client from '..';
import { technologiesQuery } from '../../queries';

export interface Technology {
  _id: string;
  name: string;
}

export async function getAllTechnologies(
  options?: FilteredResponseQueryOptions,
) {
  return client.fetch<Technology[]>(technologiesQuery, {}, options);
}
