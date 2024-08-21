import { FilteredResponseQueryOptions } from 'next-sanity';
import client from '..';
import { senioritiesQuery } from '../../queries';

export interface Seniority {
  _id: string;
  name: string;
}

export async function getAllSeniorities(
  options?: FilteredResponseQueryOptions,
) {
  return client.fetch<Seniority[]>(senioritiesQuery, {}, options);
}
