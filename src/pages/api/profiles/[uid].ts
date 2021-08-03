import prisma from '@/lib/prisma';

export default async function handler(req, res) {
  const { uid } = req.query;
  const response = await prisma.profile.findFirst({
    where: {
      discordId: uid,
    },
    include: {
      role: {
        select: { name: true },
      },
      technologies: {
        select: { name: true, id: true },
      },
      seniority: {
        select: { name: true },
      },
    },
  });
  let result = {};
  if (response) {
    result = {
      ...response,
      createdAt: response.createdAt.toString(),
      updatedAt: response.createdAt.toString(),
      technologies: response.technologies.map((tech) => ({
        ...tech,
        label: tech.name,
        value: tech.id,
      })),
    };
  } else {
    result = { error: true };
  }
  res.json(result);
}
