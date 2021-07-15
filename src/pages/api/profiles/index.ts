import { Technology } from '@prisma/client';
import prisma from '../../../lib/prisma';

export default async function handle(req, res) {
  if (req.method === 'POST') {
    const {
      name,
      id,
      email,
      discord,
      discordId,
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
    } = req.body;

    const tech: Technology[] = technologies.map((t) => ({
      id: t.value,
    }));

    let result;
    console.log({ esteid: id });
    if (id) {
      result = await prisma.profile.update({
        where: {
          email,
        },
        data: {
          name,
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
    } else {
      result = await prisma.profile.create({
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
          discordId,
          description,
          seniority: { connect: { id: seniorityId } },
          technologies: { connect: tech },
          role: { connect: { id: roleId } },
        },
      });
    }
    res.json(result);
  }
  if (req.method === 'GET') {
    const filters = {
      role: {
        id: req.filters.roleId,
      },
      location: req.filters.location,
      seniority: {
        id: req.filters.seniorityId,
      },
      description: {
        contains: req.filters.description,
      },
      technologies: {
        every: {
          id: {
            in: req.filters.technologies,
          },
        },
      },
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
}
