import { HttpError } from "wasp/server";

export const getLoops = async (_args, context) => {
  try {
    return context.entities.Loop.findMany({
      orderBy: {
        id: "desc",
      },
    });
  } catch (error) {
    throw new HttpError(500, error.message);
  }
};

export const getActiveLoops = async (_args, context) => {
  try {
    return context.entities.Loop.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        id: "desc",
      },
    });
  } catch (error) {
    throw new HttpError(500, error.message);
  }
};

export const getUsernameFromLoopID = async ({ id }, context) => {
  try {
    const user = await context.entities.User.findUnique({
      where: {
        id,
      },
      select: {
        username: true,
      },
    });

    return user?.username ?? null;
  } catch (error) {
    throw new HttpError(500, error.message);
  }
};

export const getIterations = async ({ loopId }, context) => {
  try {
    return context.entities.Iteration.findMany({
      where: {
        loop: {
          id: loopId,
        },
      },
      orderBy: {
        endTime: "desc",
      },
    });
  } catch (error) {
    throw new HttpError(500, error.message);
  }
};
