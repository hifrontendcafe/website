import { profileQuery } from '@/lib/queries';
import { FilteredResponseQueryOptions } from 'next-sanity';
import client from '..';
import { Role } from '../roles/getAllRoles';
import { Technology } from '../technology/getAllTechnologies';

export interface Profile {
  _id: string;
  description: string;
  isAvailable: boolean;
  location: string;
  technologies: Technology[];
  person: {
    _id: string;
    discord: string;
    email: string;
    firstName: string;
    lastName: string;
    github: string;
    linkedin: string;
    photo: string;
    portfolio: string;
    twitter: string;
    username: string;
  };
  role: Role;
  seniority: Role;
}

export async function getProfile(
  id: string,
  options?: FilteredResponseQueryOptions,
) {
  return client.fetch<Profile>(profileQuery, { id }, options);
}
