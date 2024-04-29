import { HttpError } from "wasp/server";

export const getLoops = async (args, context) => {
  try {
    const loops = await context.entities.Loop.findMany({
      where: { isActive: true },
    });

    return loops || [];
  } catch (error) {
    throw new HttpError(500, error.message);
  }
};

export const getUser = async ({ id }, context) => {
  if (!context.user) {
    throw new HttpError(401);
  }

  try {
    const user = await context.entities.User.findUnique({
      where: { id },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        loops: true,
      },
    });

    if (!user) throw new HttpError(404, "No user with id " + id);

    return user;
  } catch (error) {
    throw new HttpError(500, error.message);
  }
};

export const getLoopById = async ({ id }, context) => {
  try {
    const loop = await context.entities.Loop.findUnique({
      where: { id },
      include: {
        iterations: true,
      },
    });

    if (!loop) throw new HttpError(404, "No loop with id " + id);

    return loop;
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
