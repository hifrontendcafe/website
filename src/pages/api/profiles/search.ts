import { Prisma } from '@prisma/client';
import { ProfileFilters } from '@/lib/types';
import { NextApiResponse } from 'next';
import { findProfiles } from '@/lib/prisma-queries';

type Insensitive = 'insensitive';
const mode: Insensitive = 'insensitive';

type ProfileWhereInput = Prisma.ProfileWhereInput;

function makeFilters({
  roleId,
  available,
  location,
  seniorityId,
  description,
  technologies,
  active,
}: ProfileFilters): ProfileWhereInput {
  const retval: ProfileWhereInput = {};

  if (roleId) {
    retval.role = { id: roleId };
  }

  if (available) {
    retval.available = { equals: available };
  }

  if (location) {
    retval.location = { contains: location };
  }

  if (seniorityId) {
    retval.seniority = { id: seniorityId };
  }

  if (description) {
    retval.description = { mode, contains: description };
  }

  if (technologies?.length > 0) {
    retval.technologies = {
      some: { id: { in: technologies.map((tech) => tech.id) } },
    };
  }

  // search only active users by default
  retval.active = active ?? true;

  return retval;
}

type Handle = (
  { body }: { body: { filters: ProfileFilters } },
  res: NextApiResponse,
) => Promise<void>;

const handle: Handle = async ({ body }, res) => {
  const response = await findProfiles(makeFilters(body.filters));

  const result = response.map((profile) => ({
    ...profile,
    createdAt: profile.createdAt.toString(),
    updatedAt: profile.createdAt.toString(),
  }));

  res.json(result);
};

export default handle;
