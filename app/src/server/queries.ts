import {
  type DailyStats,
  type GptResponse,
  type User,
  type PageViewSource,
  type Task,
  type File,
  type Loop,
  type Iteration,
  type Checkin,
} from 'wasp/entities';
import { HttpError } from 'wasp/server';
import {
  type GetGptResponses,
  type GetDailyStats,
  type GetPaginatedUsers,
  type GetAllTasksByUser,
  type GetAllFilesByUser,
  type GetDownloadFileSignedURL,
  type GetUser,
  type GetLoops,
  type GetActiveLoops,
  type GetLoopParticipants,
  type GetLoopWatchers,
  type GetLoopById,
  type GetIterationsByLoopId,
  type GetCheckinsByIterationId,
  type GetUserByUsername,
} from 'wasp/server/operations';
import { getDownloadFileSignedURLFromS3 } from './file-upload/s3Utils.js';
import { type SubscriptionStatusOptions } from '../shared/types.js';

export const getUser: GetUser<{ id: number }, User> = async ({ id }, context) => {
  if (!context.user) {
    throw new HttpError(401);
  }

  try {
    const user = await context.entities.User.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        username: true,
        createdAt: true,
        lastActiveTimestamp: true,
        isAdmin: true,
        stripeId: true,
        checkoutSessionId: true,
        subscriptionTier: true,
        subscriptionStatus: true,
        sendEmail: true,
        datePaid: true,
        credits: true,
        gptResponses: true,
        contactFormMessages: true,
        tasks: true,
        files: true,
        // profileImage: true,
        // bio: true,
        createdLoops: {
          select: {
            id: true,
            name: true,
            projectType: true,
            numIterations: true,
            frequency: true,
            isActive: true,
            watchers: {
              select: {
                id: true,
              },
            },
            participants: {
              select: {
                id: true,
              },
            },
            iterations: true,
          },
        },
        watchedLoops: {
          select: {
            id: true,
            name: true,
            projectType: true,
            numIterations: true,
            frequency: true,
            isActive: true,
            createdBy: {
              select: {
                id: true,
              },
            },
            participants: {
              select: {
                id: true,
              },
            },
            iterations: true,
          },
        },
        participatedLoops: {
          select: {
            id: true,
            name: true,
            projectType: true,
            numIterations: true,
            frequency: true,
            isActive: true,
            createdBy: {
              select: {
                id: true,
                username: true,
              },
            },
            watchers: {
              select: {
                id: true,
              },
            },
            participants: {
              select: {
                id: true,
              },
            },
            iterations: true,
          },
        },
      },
    });

    if (!user) throw new HttpError(404, 'No user with id ' + id);

    return user;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new HttpError(500, error.message);
    } else {
      throw new HttpError(500, 'An unknown error occurred');
    }
  }
};

export const getUserByUsername: GetUserByUsername<{ username: string }, User> = async ({ username }, context) => {
  try {
    const user = await context.entities.User.findUnique({
      where: { username },
      select: {
        id: true,
        email: true,
        username: true,
        createdAt: true,
        lastActiveTimestamp: true,
        isAdmin: true,
        stripeId: true,
        checkoutSessionId: true,
        subscriptionTier: true,
        subscriptionStatus: true,
        sendEmail: true,
        datePaid: true,
        credits: true,
        gptResponses: true,
        contactFormMessages: true,
        tasks: true,
        files: true,
        // profileImage: true,
        // bio: true,
        createdLoops: {
          select: {
            id: true,
            name: true,
            projectType: true,
            numIterations: true,
            frequency: true,
            isActive: true,
            watchers: {
              select: {
                id: true,
              },
            },
            participants: {
              select: {
                id: true,
              },
            },
            iterations: true,
          },
        },
        watchedLoops: {
          select: {
            id: true,
            name: true,
            projectType: true,
            numIterations: true,
            frequency: true,
            isActive: true,
            createdBy: {
              select: {
                id: true,
              },
            },
            participants: {
              select: {
                id: true,
              },
            },
            iterations: true,
          },
        },
        participatedLoops: {
          select: {
            id: true,
            name: true,
            projectType: true,
            numIterations: true,
            frequency: true,
            isActive: true,
            createdBy: {
              select: {
                id: true,
                username: true,
              },
            },
            watchers: {
              select: {
                id: true,
              },
            },
            participants: {
              select: {
                id: true,
              },
            },
            iterations: true,
          },
        },
      },
    });

    if (!user) {
      throw new HttpError(404, 'No user with username ' + username);
    }
    return user;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new HttpError(500, error.message);
    } else {
      throw new HttpError(500, 'An unknown error occurred');
    }
  }
};

export const getLoops: GetLoops<void, Loop[]> = async (args, context) => {
  try {
    const loops = await context.entities.Loop.findMany();

    return loops || [];
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new HttpError(500, error.message);
    } else {
      throw new HttpError(500, 'An unknown error occurred');
    }
  }
};

export const getActiveLoops: GetActiveLoops<void, Loop[]> = async (args, context) => {
  try {
    const activeLoops = await context.entities.Loop.findMany({
      where: { isActive: true },
      include: {
        iterations: true,
        createdBy: true,
        watchers: {
          select: {
            id: true,
            username: true,
          },
        },
        participants: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });

    return activeLoops;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new HttpError(500, error.message);
    } else {
      throw new HttpError(500, 'An unknown error occurred');
    }
  }
};

export const getLoopById: GetLoopById<{ id: number }, Loop> = async ({ id }, context) => {
  try {
    const loop = await context.entities.Loop.findUnique({
      where: { id },
      include: {
        iterations: true,
        createdBy: true,
        watchers: {
          select: {
            id: true,
          },
        },
        participants: {
          select: {
            id: true,
          },
        },
      },
    });

    if (!loop) throw new HttpError(404, 'No loop with id ' + id);

    return loop;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new HttpError(500, error.message);
    } else {
      throw new HttpError(500, 'An unknown error occurred');
    }
  }
};

export const getLoopParticipants: GetLoopParticipants<{ loopId: number }, User[]> = async ({ loopId }, context) => {
  try {
    const participants = await context.entities.User.findMany({
      where: { participatedLoops: { some: { id: loopId } } },
    });

    return participants;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new HttpError(500, error.message);
    } else {
      throw new HttpError(500, 'An unknown error occurred');
    }
  }
};

export const getLoopWatchers: GetLoopWatchers<{ loopId: number }, User[]> = async ({ loopId }, context) => {
  try {
    const watchers = await context.entities.User.findMany({
      where: { watchedLoops: { some: { id: loopId } } },
    });

    return watchers;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new HttpError(500, error.message);
    } else {
      throw new HttpError(500, 'An unknown error occurred');
    }
  }
};

export const getIterationsByLoopId: GetIterationsByLoopId<{ loopId: number }, Iteration[]> = async (
  { loopId },
  context
) => {
  try {
    console.log('Getting iterations by loopId:', loopId);
    const iterations = await context.entities.Iteration.findMany({
      where: { loopId },
      include: {
        checkins: {
          include: {
            user: {
              select: {
                id: true,
                username: true,
                // profileImage: true,
                // bio: true,
                createdLoops: true,
                watchedLoops: true,
                participatedLoops: true,
              },
            },
          },
        },
      },
    });

    if (!iterations || iterations.length === 0) {
      throw new HttpError(404, 'No iterations found for the given loop ID');
    }

    console.log('Iterations found:', iterations.length);
    return iterations;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new HttpError(500, error.message);
    } else {
      throw new HttpError(500, 'An unknown error occurred');
    }
  }
};

export const getCheckinsByIterationId: GetCheckinsByIterationId<{ iterationId: number }, Checkin[]> = async (
  { iterationId },
  context
) => {
  try {
    const checkins = await context.entities.Checkin.findMany({
      where: { iterationId },
      include: {
        user: true,
      },
    });

    if (!checkins || checkins.length === 0) {
      throw new HttpError(404, 'No checkins found for the given iteration ID');
    }

    return checkins;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new HttpError(500, error.message);
    } else {
      throw new HttpError(500, 'An unknown error occurred');
    }
  }
};

type DailyStatsWithSources = DailyStats & {
  sources: PageViewSource[];
};

type DailyStatsValues = {
  dailyStats: DailyStatsWithSources;
  weeklyStats: DailyStatsWithSources[];
};

export const getGptResponses: GetGptResponses<void, GptResponse[]> = async (args, context) => {
  if (!context.user) {
    throw new HttpError(401);
  }
  return context.entities.GptResponse.findMany({
    where: {
      user: {
        id: context.user.id,
      },
    },
  });
};

export const getAllTasksByUser: GetAllTasksByUser<void, Task[]> = async (_args, context) => {
  if (!context.user) {
    throw new HttpError(401);
  }
  return context.entities.Task.findMany({
    where: {
      user: {
        id: context.user.id,
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
};

export const getAllFilesByUser: GetAllFilesByUser<void, File[]> = async (_args, context) => {
  if (!context.user) {
    throw new HttpError(401);
  }
  return context.entities.File.findMany({
    where: {
      user: {
        id: context.user.id,
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
};

export const getDownloadFileSignedURL: GetDownloadFileSignedURL<{ key: string }, string> = async (
  { key },
  _context
) => {
  return await getDownloadFileSignedURLFromS3({ key });
};

export const getDailyStats: GetDailyStats<void, DailyStatsValues> = async (_args, context) => {
  if (!context.user?.isAdmin) {
    throw new HttpError(401);
  }
  const dailyStats = await context.entities.DailyStats.findFirstOrThrow({
    orderBy: {
      date: 'desc',
    },
    include: {
      sources: true,
    },
  });

  const weeklyStats = await context.entities.DailyStats.findMany({
    orderBy: {
      date: 'desc',
    },
    take: 7,
    include: {
      sources: true,
    },
  });

  return { dailyStats, weeklyStats };
};

type GetPaginatedUsersInput = {
  skip: number;
  cursor?: number | undefined;
  emailContains?: string;
  isAdmin?: boolean;
  subscriptionStatus?: SubscriptionStatusOptions[];
};
type GetPaginatedUsersOutput = {
  users: Pick<
    User,
    'id' | 'email' | 'username' | 'lastActiveTimestamp' | 'subscriptionStatus' | 'stripeId'
  >[];
  totalPages: number;
};

export const getPaginatedUsers: GetPaginatedUsers<GetPaginatedUsersInput, GetPaginatedUsersOutput> = async (
  args,
  context
) => {
  if (!context.user?.isAdmin) {
    throw new HttpError(401);
  }

  const allSubscriptionStatusOptions = args.subscriptionStatus as Array<string | null> | undefined;
  const hasNotSubscribed = allSubscriptionStatusOptions?.find((status) => status === null) 
  let subscriptionStatusStrings = allSubscriptionStatusOptions?.filter((status) => status !== null) as string[] | undefined

  const queryResults = await context.entities.User.findMany({
    skip: args.skip,
    take: 10,
    where: {
      AND: [
        {
          email: {
            contains: args.emailContains || undefined,
            mode: 'insensitive',
          },
          isAdmin: args.isAdmin,
        },
        {
          OR: [
            {
              subscriptionStatus: {
                in: subscriptionStatusStrings,
              },
            },
            {
              subscriptionStatus: {
                equals: hasNotSubscribed,
              },
            },
          ],
        },
      ],
    },
    select: {
      id: true,
      email: true,
      username: true,
      isAdmin: true,
      lastActiveTimestamp: true,
      subscriptionStatus: true,
      stripeId: true,
    },
    orderBy: {
      id: 'desc',
    },
  });

  const totalUserCount = await context.entities.User.count({
    where: {
      AND: [
        {
          email: {
            contains: args.emailContains || undefined,
            mode: 'insensitive',
          },
          isAdmin: args.isAdmin,
        },
        {
          OR: [
            {
              subscriptionStatus: {
                in: subscriptionStatusStrings,
              },
            },
            {
              subscriptionStatus: {
                equals: hasNotSubscribed,
              },
            },
          ],
        },
      ],
    },
  });
  const totalPages = Math.ceil(totalUserCount / 10);

  return {
    users: queryResults,
    totalPages,
  };
};
