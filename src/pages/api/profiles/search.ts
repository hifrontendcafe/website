import prisma from '../../../lib/prisma';

export default async function handle({ body }, res) {
  const filters = {
    ...(body.filters.roleId && {
      role: {
        id: body.filters.roleId,
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
  console.log({ filters });
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
  // console.log({ result });
  res.json(result);
}
