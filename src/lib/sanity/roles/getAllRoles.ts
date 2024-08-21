import { FilteredResponseQueryOptions } from 'next-sanity';
import client from '..';
import { rolesQuery } from '../../queries';

export interface Role {
  _id: string;
  name: string;
}

export async function getAllRoles(options?: FilteredResponseQueryOptions) {
  return client.fetch<Role[]>(rolesQuery, {}, options);
}
