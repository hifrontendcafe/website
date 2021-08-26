import prisma from '../../../lib/prisma';

type Insensitive = 'insensitive';
const mode: Insensitive = 'insensitive';

export default async function handle({ body }, res) {
  const filters = {
    ...(body.filters.roleId && {
      role: {
        id: body.filters.roleId,
      },
    }),
    ...(body.filters.available && {
      available: {
        equals: body.filters.available,
      },
    }),
    ...(body.filters.location && {
      location: {
        contains: body.filters.location,
      },
    }),
    ...(body.filters.seniorityId && {
      seniority: {
        id: body.filters.seniorityId,
      },
    }),
    ...(body.filters.description && {
      description: {
        mode,
        contains: body.filters.description,
      },
    }),
    ...(body.filters?.technologies?.length > 0 && {
      technologies: {
        some: {
          id: {
            in: body.filters.technologies.map((tech) => tech.id),
          },
        },
      },
    }),
  };

  const response = await prisma.profile.findMany({
    where: filters,
    include: {
      role: {
        select: { name: true },
      },
      technologies: {
        select: { name: true },
      },
      seniority: {
        select: { name: true },
      },
    },
  });

  const result = response.map((profile) => ({
    ...profile,
    createdAt: profile.createdAt.toString(),
    updatedAt: profile.createdAt.toString(),
  }));
  res.json(result);
}
