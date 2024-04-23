import { HttpError } from 'wasp/server'

export const getChallenges = async (args, context) => {
  // Remove or comment out the user check to allow unauthenticated access
  // if (!context.user) {
  //   throw new HttpError(401);
  // }

  const challenges = await context.entities.Challenge.findMany({
    where: { isActive: true },
  });

  return challenges;
};


export const getUser = async ({ id }, context) => {
  if (!context.user) { throw new HttpError(401) }

  const user = await context.entities.User.findUnique({
    where: { id },
    select: {
      id: true,
      firstName: true,
      lastInitial: true,
      challenges: true
    }
  });

  if (!user) throw new HttpError(404, 'No user with id ' + id);

  return user;
}