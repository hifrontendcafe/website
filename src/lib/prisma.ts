import { PrismaClient } from '@prisma/client';

export interface Global {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  prisma: any;
}

declare let global: Global;

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;
