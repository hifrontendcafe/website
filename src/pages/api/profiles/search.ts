// import { Prisma } from '@prisma/client';
// import { ProfileFilters } from '@/lib/types';
// import { NextApiResponse } from 'next';
// // import { findProfiles } from '@/lib/prisma-queries';

// const fullstackRoleId = 'ed07741b-f317-4fb9-9a76-7bacf95d7e5e';
// const frontendRoleId = '348d3725-30a4-458d-b299-2d2d9381795c';
// const backendRoleId = '391270dd-4121-4f80-b6da-811c9a0b84cf';

// type Insensitive = 'insensitive';
// const mode: Insensitive = 'insensitive';

// type ProfileWhereInput = Prisma.ProfileWhereInput;

// function makeFilters({
//   roleId,
//   available,
//   location,
//   seniorityId,
//   description,
//   technologies,
//   active,
// }: ProfileFilters): ProfileWhereInput {
//   const retval: ProfileWhereInput = {};

//   if (roleId) {
//     if (roleId === frontendRoleId) {
//       retval.role = {
//         OR: [
//           {
//             id: frontendRoleId,
//           },
//           {
//             id: fullstackRoleId,
//           },
//         ],
//       };
//     } else if (roleId === backendRoleId) {
//       retval.role = {
//         OR: [
//           {
//             id: backendRoleId,
//           },
//           {
//             id: fullstackRoleId,
//           },
//         ],
//       };
//     } else {
//       retval.role = { id: roleId };
//     }
//   }

//   if (available) {
//     retval.available = { equals: available };
//   }

//   if (location) {
//     retval.location = { contains: location };
//   }

//   if (seniorityId) {
//     retval.seniority = { id: seniorityId };
//   }

//   if (description) {
//     retval.description = { mode, contains: description };
//   }

//   if (technologies?.length > 0) {
//     retval.technologies = {
//       some: { id: { in: technologies.map((tech) => tech.id) } },
//     };
//   }

//   // search only active users by default
//   retval.active = active ?? true;

//   return retval;
// }

// type Handle = (
//   { body }: { body: { filters: ProfileFilters } },
//   res: NextApiResponse,
// ) => Promise<void>;

// const handle: Handle = async ({ body }, res) => {
//   // const response = await findProfiles(makeFilters(body.filters));

//   // const result = response.map((profile) => ({
//   //   ...profile,
//   //   createdAt: profile.createdAt.toString(),
//   //   updatedAt: profile.createdAt.toString(),
//   // }));

//   // res.json(result);
// };

// export default handle;
