import { FilteredResponseQueryOptions } from 'next-sanity';
import client from '..';
import { mentorsQuery } from '../../queries';
import { Mentor } from './getMentor';

export async function getAllMentors(options?: FilteredResponseQueryOptions) {
  return client.fetch<Mentor[]>(mentorsQuery, {}, options);
}
