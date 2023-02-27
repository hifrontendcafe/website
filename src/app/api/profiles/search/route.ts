import { NextRequest } from 'next/server';
import { profilesProjections } from '@/lib/queries';
import { client } from '@/lib/api.server';
import type { Profile, ProfileFilters } from '@/lib/types';

export const runtime = 'edge';

const sanityKeys: Record<
  keyof ProfileFilters,
  { type: string; value: string }
> = {
  roleId: {
    type: 'string',
    value: 'role->_id',
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
    value: 'seniority->_id',
  },
  technologies: {
    type: 'match',
    value: 'technologies[]->name',
  },
};

function getParsedValue(
  key: { type: string; value: string },
  value: string | string[] | boolean,
): string | boolean {
  if (key.type === 'string') return `"${value}"`;

  if (key.type === 'bool') return value as boolean;

  if (key.type === 'match' && Array.isArray(value))
    return `[${value.map((v: string) => `"${v}"`).join(',')}]`;

  if (key.type === 'match') {
    return `"${value}"`;
  }

  return value as string;
}

const getType = (type: string) =>
  ['string', 'bool'].includes(type) ? '==' : type;

function makeQuery(filters: ProfileFilters): string {
  const queryFilters = Object.entries(filters)
    .reduce((result, entry) => {
      const [key, value] = entry;

      if (
        !value ||
        (Array.isArray(value) && value.length === 0) ||
        !sanityKeys[key]
      )
        return result;

      const type = getType(sanityKeys[key].type);

      const sKey = sanityKeys[key].value;

      const newValue = getParsedValue(
        sanityKeys[key],
        Array.isArray(value) ? value.map((v) => v.name) : value,
      );

      return [...result, `${sKey} ${type} ${newValue}`];
    }, [])
    .join(' && ');

  return `*[_type =='profile' && isActive == true ${
    queryFilters.length > 0 ? '&&' : ''
  } ${queryFilters}] {
    ${profilesProjections}
  }`;
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  const profiles = await client.fetch<Profile[]>({
    query: makeQuery(body.filters),
    config: {
      cache: 'force-cache',
      next: { revalidate: 60 },
    },
  });

  return new Response(JSON.stringify(profiles), {
    headers: { 'Content-Type': 'application/json' },
  });
}
