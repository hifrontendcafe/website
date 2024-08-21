import { eventsQuery } from '@/lib/queries';
import { FilteredResponseQueryOptions } from 'next-sanity';
import client from '..';

export interface Event {
  title: string;
  slug: string;
  category: {
    name: string;
  };
  cover: {
    src: string;
    alt?: string;
  };
  date: string;
  endDate?: string;
  description: string;
  recording?: string;
  discordId?: string;
}

export async function getAllEvents(options: FilteredResponseQueryOptions) {
  return client.fetch<Event[]>(eventsQuery, {}, options);
}
