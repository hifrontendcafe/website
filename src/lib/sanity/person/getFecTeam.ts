import { staffQuery } from '@/lib/queries';
import { SanityImageSource } from '@sanity/asset-utils';
import { FilteredResponseQueryOptions } from 'next-sanity';
import client from '..';

export interface CMYKParticipant {
  _id?: string;
  discordUser: {
    _type: string;
    _ref: string;
  };
  participationLevel?: string;
  participationType?: string;
  aboutParticipant: string;
  previousKnowledge: string;
  isChix: boolean;
  workExperience: string;
  stackWanted: string;
  timeAvailability: string;
  projects: string;
  experience: string;
  otherQuestions: string;
  cmykVersion: string;
  status: string;
}

export interface Person {
  _id: string;
  username: {
    current: string;
  };
  discordID: string;
  photo:
    | {
        src: string;
        alt?: string;
      }
    | SanityImageSource;
  firstName?: string;
  lastName?: string;
  email?: string;
  linkedin?: string;
  twitter?: string;
  portfolio?: string;
  github?: string;
  fecTeam?: boolean;
  timezone?: string;
  cmykParticipant?: CMYKParticipant[];
}

export async function getFecTeam(options?: FilteredResponseQueryOptions) {
  return client.fetch<Person[]>(staffQuery, {}, options);
}
