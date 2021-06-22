import prisma from '../../lib/prisma';

export default async function handle(req, res) {
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
  } = req.body;

  const tech = technologies.map((t) => ({
    id: t.id,
  }));

  const result = await prisma.profile.create({
    data: {
      name,
      email,
      discord,
      github,
      available,
      linkedin,
      portfolio,
      twitter,
      location,
      photo,
      seniorityId,
      technologies: { connect: [tech] },
      roleId,
    },
  });
  res.json(result);
}
