import { HttpError } from "wasp/server";

export const createLoop = async (args, context) => {
  try {
    const loop = await context.entities.Loop.create({
      data: {
        name: args.name,
        projectType: args.projectType,
        numIterations: args.numIterations,
        frequency: args.frequency,
        isActive: true,
        createdById: args.createdById,
        participants: {
          connect: {
            id: args.createdById,
          },
        },
      },
    });
    return loop;
  } catch (error) {
    throw new HttpError(500, error.message);
  }
};
export const joinLoop = async (args, context) => {
  try {
    const { user, loop } = args;
    const updatedLoop = await context.entities.Loop.update({
      where: { id: loop.id },
      data: {
        participants: {
          connect: {
            id: user.id,
          },
        },
      },
      include: {
        participants: true,
      },
    });

    return updatedLoop;
  } catch (error) {
    throw new HttpError(500, error.message);
  }
};
export const watchLoop = async (args, context) => {
  try {
    const { user, loop } = args;
    const updatedLoop = await context.entities.Loop.update({
      where: { id: loop.id },
      data: {
        watchers: {
          connect: {
            id: user.id,
          },
        },
      },
      include: {
        watchers: true,
      },
    });

    return updatedLoop;
  } catch (error) {
    throw new HttpError(500, error.message);
  }
};
export const leaveLoop = async (args, context) => {
  try {
    const { user, loop } = args;
    const updatedLoop = await context.entities.Loop.update({
      where: { id: loop.id },
      data: {
        participants: {
          disconnect: {
            id: user.id,
          },
        },
      },
      include: {
        participants: true,
      },
    });

    return updatedLoop;
  } catch (error) {
    throw new HttpError(500, error.message);
  }
};
export const unwatchLoop = async (args, context) => {
  try {
    const { user, loop } = args;
    const updatedLoop = await context.entities.Loop.update({
      where: { id: loop.id },
      data: {
        watchers: {
          disconnect: {
            id: user.id,
          },
        },
      },
      include: {
        watchers: true,
      },
    });

    return updatedLoop;
  } catch (error) {
    throw new HttpError(500, error.message);
  }
};
export const deleteLoop = async (args, context) => {
  try {
    const { loop, user } = args;
    const loopToDelete = await context.entities.Loop.findUnique({
      where: { id: loop.id },
      include: { iterations: true },
    });

    if (!loopToDelete) {
      throw new HttpError(404, `Loop with id ${loop.id} not found`);
    }

    if (loopToDelete.createdById !== user.id) {
      throw new HttpError(403, "You can only delete loops that you created.");
    }

    await context.entities.Iteration.deleteMany({
      where: { loopId: loop.id },
    });

    const deletedLoop = await context.entities.Loop.delete({
      where: { id: loop.id },
    });

    return deletedLoop;
  } catch (error) {
    throw new HttpError(500, error.message);
  }
};
export const deactivateLoop = async (args, context) => {
  try {
    const { loop, user } = args;
    const loopToDeactivate = await context.entities.Loop.findUnique({
      where: { id: loop.id },
    });

    if (!loopToDeactivate) {
      throw new HttpError(404, `Loop with id ${loop.id} not found`);
    }

    if (loopToDeactivate.createdById !== user.id) {
      throw new HttpError(
        403,
        "You can only deactivate loops that you created."
      );
    }

    const deactivatedLoop = await context.entities.Loop.update({
      where: { id: loop.id },
      data: { isActive: false },
    });

    return deactivatedLoop;
  } catch (error) {
    throw new HttpError(500, error.message);
  }
};
export const createIterations = async (args, context) => {
  const loop = args.loop;
  const now = new Date();
  const endDate = new Date(now);

  switch (loop.frequency) {
    case "daily":
      endDate.setDate(now.getDate() + loop.numIterations);
      break;
    case "weekly":
      endDate.setDate(now.getDate() + loop.numIterations * 7);
      break;
    case "monthly":
      endDate.setMonth(now.getMonth() + loop.numIterations);
      break;
    default:
      throw new HttpError(400, `Unsupported frequency: ${loop.frequency}`);
  }

  const iterations = [];
  for (let i = 0; i < loop.numIterations; i++) {
    const startTime = new Date(now);
    const endTime = new Date(now);

    switch (loop.frequency) {
      case "daily":
        startTime.setDate(now.getDate() + i);
        endTime.setDate(now.getDate() + i + 1);
        break;
      case "weekly":
        startTime.setDate(now.getDate() + i * 7);
        endTime.setDate(now.getDate() + (i + 1) * 7);
        break;
      case "monthly":
        startTime.setMonth(now.getMonth() + i);
        endTime.setMonth(now.getMonth() + i + 1);
        break;
    }

    try {
      const iteration = await context.entities.Iteration.create({
        data: {
          loop: {
            connect: {
              id: loop.id,
            },
          },
          startTime,
          endTime,
        },
      });

      iterations.push(iteration);
    } catch (error) {
      throw new HttpError(500, error.message);
    }
  }

  try {
    await context.entities.Loop.update({
      where: { id: loop.id },
      data: {
        iterations: {
          connect: iterations.map((iteration) => ({ id: iteration.id })),
        },
      },
    });

    const updatedLoop = await context.entities.Loop.findUnique({
      where: { id: loop.id },
      include: { iterations: true },
    });

    return updatedLoop;
  } catch (error) {
    throw new HttpError(500, error.message);
  }
};
export const createIteration = async (args, context) => {
  try {
    const iteration = await context.entities.Iteration.create({
      data: {
        loop: {
          connect: {
            id: args.loopId,
          },
        },
        startTime: args.startTime,
        endTime: args.endTime,
      },
    });

    return iteration;
  } catch (error) {
    throw new HttpError(500, error.message);
  }
};
export const createCheckin = async (args, context) => {
  try {
    const checkin = await context.entities.Checkin.create({
      data: {
        iteration: {
          connect: {
            id: args.iterationId,
          },
        },
        user: {
          connect: {
            id: context.user.id,
          },
        },
        proofOfWork: args.proofOfWork,
      },
    });

    return checkin;
  } catch (error) {
    throw new HttpError(500, error.message);
  }
};
