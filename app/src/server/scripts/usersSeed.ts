import { type User, type Loop, type Iteration } from 'wasp/entities';
import { faker } from '@faker-js/faker';
import type { PrismaClient } from '@prisma/client';

// in a terminal window run `wasp db seed` to seed your dev database with mock user data
export function createRandomUser() {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const user: Omit<User, 'id'> = {
    email: faker.internet.email({
      firstName,
      lastName,
    }),
    username: faker.internet.userName({
      firstName,
      lastName,
    }),
    createdAt: faker.date.between({ from: new Date('2023-01-01'), to: new Date() }),
    lastActiveTimestamp: faker.date.recent(),
    isAdmin: false,
    stripeId: `cus_${faker.string.uuid()}`,
    sendEmail: false,
    subscriptionStatus: faker.helpers.arrayElement(['active', 'canceled', 'past_due', 'deleted', null]),
    datePaid: faker.date.recent(),
    credits: faker.number.int({ min: 0, max: 3 }),
    checkoutSessionId: null,
    subscriptionTier: faker.helpers.arrayElement(['hobby', 'pro']),
  };
  return user;
}

export function createRandomLoop(): Omit<Loop, 'id' | 'userId'> {
  const name = faker.lorem.words(3);
  const description = faker.lorem.words(10);
  const accountabilityPartner = faker.internet.userName();
  const isActive = faker.datatype.boolean();

  const loop: Omit<Loop, 'id' | 'userId'> = {
    name,
    description,
    accountabilityPartner,
    isActive,
  };

  return loop;
}

export function createRandomIteration(loopId: number): Omit<Iteration, 'id'> {
  const startTime = faker.date.recent();
  const endTime = faker.date.future();
  const checkin = faker.lorem.words(10);
  const isComplete = faker.datatype.boolean();

  const iteration: Omit<Iteration, 'id'> = {
    loopId,
    startTime,
    endTime,
    checkin,
    isComplete,
  };

  return iteration;
}

const USERS: Omit<User, 'id'>[] = faker.helpers.multiple(createRandomUser, {
  count: 15,
});

export async function devSeedUsers(prismaClient: PrismaClient) {
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
