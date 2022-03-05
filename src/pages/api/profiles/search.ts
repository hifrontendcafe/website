import { getClient } from '@/lib/api';
import { profilesProjections } from '@/lib/queries';
import { Profile, ProfileFilters } from '@/lib/types';
import { NextApiRequest, NextApiResponse } from 'next';

const sanityKeys: Record<
  keyof Omit<ProfileFilters, 'technologies'>,
  string | { type: string; value: string }
> = {
  roleId: 'role->_id',
  active: 'isActive',
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
  seniorityId: 'seniority->_id',
};

function makeQuery(filters: ProfileFilters): string {
  const queryFilters = Object.entries(filters)
    .reduce((result, entry) => {
      const [key, value] = entry;

      if (!value || !sanityKeys[key]) return result;

      const type =
        typeof sanityKeys[key] === 'string' || sanityKeys[key].type === 'bool'
          ? '=='
          : sanityKeys[key].type;

      const sKey =
        typeof sanityKeys[key] === 'string'
          ? sanityKeys[key]
          : sanityKeys[key].value;

      const newValue =
        typeof sanityKeys[key] === 'string'
          ? `"${value}"`
          : sanityKeys[key].type === 'bool'
          ? value
          : `"${value}"`;

      return [...result, `${sKey} ${type} ${newValue}`];
    }, [])
    .join(' && ');

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
  const response = (await getClient(preview).fetch(
    makeQuery(body.filters),
  )) as Profile[];

  res.json(response);
};

export default handle;
