import { FilteredResponseQueryOptions } from 'next-sanity';
import client from '..';
import { mentorsTopicsQuery } from '../../queries';

export interface Topic {
  _id: string;
  title: string;
  description?: string;
}

export async function getMentoringTopics(
  options?: FilteredResponseQueryOptions,
) {
  return client.fetch<Topic[]>(mentorsTopicsQuery, {}, options);
}
