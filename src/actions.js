import { HttpError } from "wasp/server";
export const createLoop = async (args, context) => {
  console.log("Creating loop with args:", args);

  try {
    const loop = await context.entities.Loop.create({
      data: {
        projectType: args.projectType,
        startDate: args.startDate,
        numIterations: args.numIterations,
        frequency: args.frequency,
        isActive: true,
        name: args.name,
        userId: context.user.id,
        subscribers: {
          connect: [{ id: context.user.id }],
        },
      },
    });

    return loop;
  } catch (error) {
    console.error("Error creating loop:", error);
    throw error;
  }
};

export const requireSignIn = async (args, context) => {
  if (!context.user) {
    throw new HttpError(401, "You must be signed in to perform this action.");
  }
};

