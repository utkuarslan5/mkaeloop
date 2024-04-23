import { HttpError } from 'wasp/server'

export const createChallenge = async (args, context) => {
  return context.entities.Challenge.create({
    data: {
      projectType: args.projectType,
      timeframe: args.timeframe,
      user: context.user
        ? {
            connect: { id: context.user.id },
          }
        : undefined,
      isActive: true,
      challengeName: args.challengeName,
    },
  });
};
