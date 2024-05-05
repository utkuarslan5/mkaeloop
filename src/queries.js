import { HttpError } from "wasp/server";

export const getUser = async ({ id }, context) => {
  if (!context.user) {
    throw new HttpError(401);
  }

  try {
    const user = await context.entities.User.findUnique({
      where: { id },
      select: {
        id: true,
        username: true,
        profileImage: true,
        createdLoops: {
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
              },
            },
            watchers: {
              select: {
                id: true,
              },
            },
            iterations: true,
          },
        },
      },
    });

    if (!user) throw new HttpError(404, "No user with id " + id);

    return user;
  } catch (error) {
    throw new HttpError(500, error.message);
  }
};

export const getUserByUsername = async ({ username }, context) => {
  try {
    const user = await context.entities.User.findUnique({
      where: { username },
      select: {
        id: true,
        username: true,
        profileImage: true,
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
              },
            },
            watchers: {
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
      throw new HttpError(404, "No user with username " + username);
    }
    return user;
  } catch (error) {
    console.error(`Error getting user by username: ${error.message}`);
    throw new HttpError(500, error.message);
  }
};

export const getLoops = async (args, context) => {
  try {
    const loops = await context.entities.Loop.findMany();

    return loops || [];
  } catch (error) {
    throw new HttpError(500, error.message);
  }
};

export const getActiveLoops = async (args, context) => {
  try {
    const activeLoops = await context.entities.Loop.findMany({
      where: { isActive: true },
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

    return activeLoops;
  } catch (error) {
    throw new HttpError(500, error.message);b
  }
};

export const getLoopById = async ({ id }, context) => {
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

    if (!loop) throw new HttpError(404, "No loop with id " + id);

    return loop;
  } catch (error) {
    throw new HttpError(500, error.message);
  }
};

export const getLoopParticipants = async ({ loopId }, context) => {
  try {
    const participants = await context.entities.User.findMany({
      where: { participatedLoops: { some: { id: loopId } } },
    });

    return participants;
  } catch (error) {
    throw new HttpError(500, error.message);
  }
};

export const getLoopWatchers = async ({ loopId }, context) => {
  try {
    const watchers = await context.entities.User.findMany({
      where: { watchedLoops: { some: { id: loopId } } },
    });

    return watchers;
  } catch (error) {
    throw new HttpError(500, error.message);
  }
};

export const getIterationsByLoopId = async ({ loopId }, context) => {
  try {
    const iterations = await context.entities.Iteration.findMany({
      where: { loopId },
    });

    if (!iterations || iterations.length === 0) {
      throw new HttpError(404, "No iterations found for the given loop ID");
    }

    return iterations;
  } catch (error) {
    throw new HttpError(500, error.message);
  }
};

export const getCheckinsByIterationId = async ({ iterationId }, context) => {
  try {
    const checkins = await context.entities.Checkin.findMany({
      where: { iterationId },
      include: {
        user: true,
      },
    });

    if (!checkins || checkins.length === 0) {
      throw new HttpError(404, "No checkins found for the given iteration ID");
    }

    return checkins;
  } catch (error) {
    throw new HttpError(500, error.message);
  }
};
