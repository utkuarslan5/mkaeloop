import { HttpError } from "wasp/server";

export const createLoop = async (args, context) => {
  try {
    console.log("Creating loop...");
    const loop = await context.entities.Loop.create({
      data: {
        name: args.name,
        projectType: args.projectType,
        numIterations: args.numIterations,
        frequency: args.frequency,
        isActive: true,
        createdById: context.user.id,
      },
    });

    console.log("Loop created successfully.");

    return loop;
  } catch (error) {
    console.error("Error creating loop:", error);
    throw error;
  }
};

export const createIterations = async (args, context) => {
  const loop = args.loop;
  console.log("Creating iterations...");
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
      throw new Error(`Unsupported frequency: ${loop.frequency}`);
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

    // console.log("Updated loop with iterations:", updatedLoop);
    console.log("Iterations connected to the loop successfully.");
    return updatedLoop;
  } catch (error) {
    console.error("Error updating loop with iterations:", error);
    throw error;
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
    console.error("Error creating iteration:", error);
    throw error;
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
    console.error("Error creating checkin:", error);
    throw error;
  }
};

export const deleteLoop = async (args, context) => {
  try {
    const loopToDelete = await context.entities.Loop.findUnique({
      where: { id: args.id },
      include: { iterations: true },
    });

    if (!loopToDelete) {
      throw new Error(`Loop with id ${args.id} not found`);
    }

    if (loopToDelete.createdBy !== context.user.id) {
      throw new Error("You can only delete loops that you created.");
    }

    await context.entities.Iteration.deleteMany({
      where: { loopId: args.id },
    });

    const deletedLoop = await context.entities.Loop.delete({
      where: { id: args.id },
    });

    return deletedLoop;
  } catch (error) {
    console.error("Error deleting loop:", error);
    throw error;
  }
};

