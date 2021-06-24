import { Technology } from '@prisma/client';
import prisma from '../../lib/prisma';

export default async function handle({ body }, res) {
  const {
    name,
    email,
    discord,
    github,
    linkedin,
    portfolio,
    twitter,
    location,
    photo,
    seniorityId,
    roleId,
    available,
    technologies,
    description,
  } = body;

  const tech: Technology[] = technologies.map((t) => ({
    id: t.id,
  }));

  const result = await prisma.profile.create({
    data: {
      name,
      email,
      discord,
      github,
      linkedin,
      available,
      active: true,
      portfolio,
      twitter,
      location,
      photo,
      description,
      seniority: { connect: { id: seniorityId } },
      technologies: { connect: tech },
      role: { connect: { id: roleId } },
    },
  });
  res.json(result);
}
