import { profilesQuery } from '@/lib/queries';
import { FilteredResponseQueryOptions } from 'next-sanity';
import client from '..';
import { Profile } from './getProfile';

export async function getAllProfiles(options?: FilteredResponseQueryOptions) {
  return client.fetch<Profile[]>(profilesQuery, {}, options);
}
