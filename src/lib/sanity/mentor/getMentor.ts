import { FilteredResponseQueryOptions } from 'next-sanity';
import client from '..';
import { mentorQuery } from '../../queries';
import { Topic } from '../topics/getMentoringTopics';

type MentorStatus = 'ACTIVE' | 'NOT_AVAILABLE' | 'INACTIVE' | 'OUT';

export interface Mentor {
  _id: string;
  name: string;
  description: string;
  photo: {
    src: string;
    alt?: string;
  };
  status: MentorStatus;
  web: string;
  calendly: string;
  linkedin: string;
  github: string;
  twitter?: string;
  // FIXME: Topics are not allways like this
  topics: [
    {
      _key: string;
      _ref: string;
    },
  ];
}

/**
 * TODO: unify the Topic types
 */
type TMentor = Omit<Mentor, 'topics'> & { topics: Topic[] };

export async function getMentor(
  id: string,
  options?: FilteredResponseQueryOptions,
) {
  return client.fetch<TMentor>(mentorQuery, { id }, options);
}
