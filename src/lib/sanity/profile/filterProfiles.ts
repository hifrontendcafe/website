import { profilesProjections } from '@/lib/queries';
import { FilteredResponseQueryOptions } from 'next-sanity';
import client from '..';
import { Technology } from '../technology/getAllTechnologies';
import { Profile } from './getProfile';

const sanityKeys = {
  roleId: {
    type: 'string',
    value: 'role._ref',
  },
  active: {
    type: 'string',
    value: 'isActive',
  },
  available: {
    type: 'bool',
    value: 'isAvailable',
  },
  description: {
    type: 'match',
    value: 'description',
  },
  location: {
    type: 'match',
    value: 'location',
  },
  seniorityId: {
    type: 'string',
    value: 'seniority._ref',
  },
  technologies: {
    type: 'match',
    value: 'technologies[]._ref',
  },
} as const;

function getParsedValue(
  key: (typeof sanityKeys)[keyof typeof sanityKeys],
  value: string | string[] | boolean,
): string | boolean {
  switch (key.type) {
    case 'string':
      return `"${value}"`;
    case 'bool':
      return value as boolean;
    case 'match':
      return Array.isArray(value)
        ? `[${value.map((v: string) => `"${v}"`).join(',')}]`
        : `"${value}"`;
    default: {
      throw new Error(`Unhandled type: ${key}`);
    }
  }
}

export interface ProfileFilters {
  roleId?: string;
  location?: string;
  seniorityId?: string;
  description?: string;
  technologies?: Technology[];
  available?: boolean;
  active?: boolean;
}

function makeQuery(filters: ProfileFilters): string {
  const queryFilters = Object.entries(filters);

  const filtersQueryParts = [];
  for (const [key, value] of queryFilters) {
    // Skip empty values
    if (!value || (Array.isArray(value) && value.length === 0)) {
      continue;
    }

    // Skip unknown keys
    if (!(key in sanityKeys)) {
      continue;
    }

    const sanityKey = sanityKeys[key as keyof typeof sanityKeys];

    const type =
      sanityKey.type === 'string' || sanityKey.type === 'bool'
        ? '=='
        : sanityKey.type;
    const newValue = getParsedValue(sanityKey, value);

    filtersQueryParts.push(`${sanityKey.value} ${type} ${newValue}`);
  }

  return `*[_type =='profile' && isActive == true ${
    filtersQueryParts.length > 0 ? '&&' : ''
  } ${filtersQueryParts.join(' && ')}] {
    ${profilesProjections}
  }`;
}

export async function filterProfiles(
  filters: ProfileFilters,
  technologies: Technology[],
  options?: FilteredResponseQueryOptions,
) {
  return client.fetch<Profile[]>(
    makeQuery({
      ...filters,
      technologies,
      available: Boolean(filters.available),
    }),
    {},
    options,
  );
}
