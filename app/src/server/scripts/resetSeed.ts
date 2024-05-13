import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const deleteAll = async () => {
  await prisma.iteration.deleteMany({});
  await prisma.loop.deleteMany({});
  await prisma.user.deleteMany({});
};

export const resetSequences = async () => {
  await prisma.$queryRaw`SELECT setval('"User_id_seq"', (SELECT MAX(id) FROM "User"));`;
  await prisma.$queryRaw`SELECT setval('"Loop_id_seq"', (SELECT MAX(id) FROM "Loop"));`;
  await prisma.$queryRaw`SELECT setval('"Iteration_id_seq"', (SELECT MAX(id) FROM "Iteration"));`;
};

export const resetAll = async () => {
  try {
    await deleteAll();
    await resetSequences();
  } catch (e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
};
