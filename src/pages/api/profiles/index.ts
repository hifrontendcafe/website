// import type { NextApiRequest, NextApiResponse } from 'next';

// import { Technology } from '@prisma/client';
// import prisma from '@/lib/prisma';

// export default async function handle(
//   req: NextApiRequest,
//   res: NextApiResponse,
// ): Promise<void> {
//   if (req.method === 'POST') {
//     const {
//       name,
//       id,
//       email,
//       discord,
//       discordId,
//       github,
//       linkedin,
//       portfolio,
//       twitter,
//       location,
//       photo,
//       seniorityId,
//       roleId,
//       available,
//       technologies,
//       description,
//     } = req.body;

//     const tech: Technology[] = technologies.map((t) => ({
//       id: t.value,
//     }));

//     let result;
//     if (id) {
//       result = await prisma.profile.update({
//         where: {
//           email,
//         },
//         data: {
//           name,
//           discord,
//           github,
//           linkedin,
//           available,
//           active: true,
//           portfolio,
//           twitter,
//           location,
//           photo,
//           description,
//           seniority: { connect: { id: seniorityId } },
//           technologies: { connect: tech },
//           role: { connect: { id: roleId } },
//         },
//       });
//     } else {
//       result = await prisma.profile.create({
//         data: {
//           name,
//           email,
//           discord,
//           github,
//           linkedin,
//           available,
//           active: false,
//           portfolio,
//           twitter,
//           location,
//           photo,
//           discordId,
//           description,
//           seniority: { connect: { id: seniorityId } },
//           technologies: { connect: tech },
//           role: { connect: { id: roleId } },
//         },
//       });
//     }
//     res.json(result);
//   }
// }
