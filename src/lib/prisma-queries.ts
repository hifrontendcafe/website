import prisma from '@/lib/prisma';
import { Prisma, PrismaPromise, Profile } from '@prisma/client';
import { ExtendedProfile } from './types';

type ProfileWhereInput = Prisma.ProfileWhereInput;

export function findProfiles(
  filters: ProfileWhereInput,
): PrismaPromise<ExtendedProfile[]> {
  return prisma.profile.findMany({
    where: filters,
    include: {
      role: {
        select: { id: true, name: true },
      },
      technologies: {
        select: { name: true },
      },
      seniority: {
        select: { id: true, name: true },
      },
    },
  });
}

export function findProfilesBasic(
  filters: ProfileWhereInput,
): PrismaPromise<Profile[]> {
  return prisma.profile.findMany({
    where: filters,
  });
}
