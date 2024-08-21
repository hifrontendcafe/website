import { cmykQuery } from '@/lib/queries';
import { FilteredResponseQueryOptions } from 'next-sanity';
import client from '..';

export interface CMYK {
  _id: string;
  name: string;
  description: string;
  color: string;
  image: {
    src: string;
  };
  github: string;
  demo: string;
  cmykVersion: string;
}

export async function getAllCMYKProjects(
  options: FilteredResponseQueryOptions,
) {
  return client.fetch<CMYK[]>(cmykQuery, {}, options);
}
