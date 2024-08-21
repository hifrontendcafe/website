import { FilteredResponseQueryOptions } from 'next-sanity';
import client from '..';
import { featuredCardsQuery } from '../../queries';

export interface FeaturedCard {
  icon: string;
  title: string;
  description: string;
  color: string;
  btnText: string;
  link?: string;
}

export async function getAllFeaturedCards(
  options?: FilteredResponseQueryOptions,
) {
  return client.fetch<FeaturedCard[]>(featuredCardsQuery, {}, options);
}
