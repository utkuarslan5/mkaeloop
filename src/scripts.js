import { faker } from "@faker-js/faker";

// in a terminal window run `wasp db seed` to seed your dev database with mock user data
export function createRandomUser() {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const user = {
    username: faker.internet.userName({
      firstName,
      lastName,
    }),
  };
  return user;
}

export function createRandomLoop() {
  const name = faker.lorem.words(3);
  const description = faker.lorem.words(10);
  const isActive = faker.datatype.boolean();

  const loop = {
    name,
    description,
    isActive,
  };

  return loop;
}

export function createRandomIteration(loopId) {
  const startTime = faker.date.recent();
  const endTime = faker.date.future();
  const checkin = faker.lorem.words(10);
  const isComplete = faker.datatype.boolean();

  const iteration = {
    loopId,
    startTime,
    endTime,
    checkin,
    isComplete,
  };

  return iteration;
}

const USERS = faker.helpers.multiple(createRandomUser, {
  count: 15,
});

export async function devSeedUsers(prismaClient) {
  try {
    await Promise.all(
      USERS.map(async (user) => {
        const createdUser = await prismaClient.user.create({
          data: user,
        });

        // Create random number of loops for each user
        const numLoops = faker.number.int({ min: 1, max: 5 });
        for (let i = 0; i < numLoops; i++) {
          const loop = createRandomLoop();
          const createdLoop = await prismaClient.loop.create({
            data: {
              ...loop,
              user: {
                connect: { id: createdUser.id },
              },
            },
          });

          // Create random iterations for the loop
          const numIterations = faker.number.int({ min: 1, max: 10 });
          for (let j = 0; j < numIterations; j++) {
            await prismaClient.iteration.create({
              data: createRandomIteration(createdLoop.id),
            });
          }
        }
      })
    );
  } catch (error) {
    console.error(error);
  }
}
export async function deleteAll(prismaClient) {
  await prismaClient.iteration.deleteMany({});
  await prismaClient.loop.deleteMany({});
  await prismaClient.user.deleteMany({});
}

export async function resetSequences(prismaClient) {
  await prismaClient.$queryRaw`SELECT setval('"User_id_seq"', (SELECT MAX(id) FROM "User"));`;
  await prismaClient.$queryRaw`SELECT setval('"Loop_id_seq"', (SELECT MAX(id) FROM "Loop"));`;
  await prismaClient.$queryRaw`SELECT setval('"Iteration_id_seq"', (SELECT MAX(id) FROM "Iteration"));`;
}

export async function resetAll(prismaClient) {
  try {
    await deleteAll(prismaClient);
    await resetSequences(prismaClient);
  } catch (e) {
    console.error(e);
  } finally {
    await prismaClient.$disconnect();
  }
}
