import { getClient } from '@/lib/api';
import { profilesProjections } from '@/lib/queries';
import { Profile, ProfileFilters } from '@/lib/types';
import { NextApiRequest, NextApiResponse } from 'next';

export const config = {
  runtime: 'edge',
};

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

  console.log(queryFilters);

  return `*[_type =='profile' && isActive == true ${
    queryFilters.length > 0 ? '&&' : ''
  } ${queryFilters}] {
    ${profilesProjections}
  }`;
}

type Handle = (
  req: NextApiRequest & { body: { filters: ProfileFilters } },
  res: NextApiResponse,
) => Promise<void>;

const handle: Handle = async ({ body, preview }, res) => {
  console.log(body.filters);

  const response = (await getClient(preview).fetch(
    makeQuery(body.filters),
  )) as Profile[];

  res.json(response);
};

export default handle;
