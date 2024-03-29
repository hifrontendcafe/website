import { type NextRequest, NextResponse } from 'next/server';
import type { Profile, ProfileFilters } from '@/lib/types';
import { profilesProjections } from '@/lib/queries';
import { client } from '@/lib/api.server';

export const runtime = 'edge';

const sanityKeys: Record<
  keyof ProfileFilters,
  { type: string; value: string }
> = {
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
    .reduce(
      (result, entry) => {
        const [key, value] = entry as [keyof ProfileFilters, any];

        if (
          !value ||
          (Array.isArray(value) && value.length === 0) ||
          !sanityKeys[key]
        )
          return result;

        const type = getType(sanityKeys[key].type);

        const sKey = sanityKeys[key].value;

        const newValue = getParsedValue(sanityKeys[key], value);

        return [...result, `${sKey} ${type} ${newValue}`];
      },
      [''],
    )
    .join(' && ');

  return `*[_type =='profile' && isActive == true ${
    queryFilters.length > 0 ? '&&' : ''
  } ${queryFilters}] {
    ${profilesProjections}
  }`;
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url);

  const filters = Object.fromEntries(url.searchParams.entries());

  const technologies = url.searchParams.getAll('technologies') as any;

  const profiles = await client.fetch<Profile[]>({
    query: makeQuery({
      ...filters,
      technologies,
      available: Boolean(filters.available),
    }),
    config: {
      cache: 'force-cache',
      next: { revalidate: 120 },
    },
  });

  return NextResponse.json(profiles);
}
