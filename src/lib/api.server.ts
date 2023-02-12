import { cache } from 'react';
import {
  featuredCardsQuery,
  pageByPathQuery,
  postQuery,
  postsQuery,
  settingsQuery,
} from './queries';
import client from './sanity';
import { FeaturedCards, Page, Post, Settings } from './types';

const clientFetch = cache(client.fetch.bind(client));

export async function getSettings(): Promise<Settings> {
  return await clientFetch(settingsQuery);
}

export async function getAllPosts(): Promise<Post[]> {
  return await clientFetch(postsQuery);
}

export async function getPageByPath(path: string): Promise<Page> {
  return await clientFetch(pageByPathQuery, { path });
}

export async function getAllFeaturedCards(): Promise<FeaturedCards[]> {
  return await clientFetch(featuredCardsQuery);
}

export async function getPost(slug: string): Promise<Post> {
  return await clientFetch(postQuery, { slug });
}

export async function getAllPostsSlugs(): Promise<string[]> {
  return await clientFetch(
    `*[_type == "post" && defined(slug.current)][].slug.current `,
  );
}
