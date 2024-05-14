import { HttpError } from "wasp/server";
export const createLoop = async (
  { name, description, accountabilityPartner },
  context
) => {
  if (!context.user) {
    throw new HttpError(401);
  }

  console.log("Creating a new loop...");

  try {
    const loop = await context.entities.Loop.create({
      data: {
        name,
        description,
        accountabilityPartner,
        user: { connect: { id: context.user.id } },
        iterations: {
          create: {
            startTime: new Date(),
            endTime: getNextFridayDate(),
            checkin: "",
          },
        },
      },
    });
    console.log("Created a new loop", loop);
    return loop;
  } catch (error) {
    console.error("Error creating loop:", error);
    throw new HttpError(500, "Error creating loop");
  }
};

export const addCheckin = async ({ loopId, checkin }, context) => {
  if (!context.user) {
    throw new HttpError(401);
  }

  try {
    const loop = await context.entities.Loop.findUnique({
      where: { id: loopId },
      include: { iterations: true },
    });

    if (!loop) {
      throw new HttpError(404, "Loop not found");
    }

    if (loop.userId !== context.user.id) {
      throw new HttpError(403, "Not authorized to update this loop");
    }

    const latestIteration = loop.iterations[loop.iterations.length - 1];

    const updatedLoop = await context.entities.Loop.update({
      where: { id: loopId },
      data: {
        iterations: {
          update: {
            where: { id: latestIteration.id },
            data: { checkin, isComplete: true },
          },
          create: {
            startTime: new Date(
              latestIteration.endTime.getTime() + 24 * 60 * 60 * 1000
            ),
            endTime: getNextFridayFromDate(
              latestIteration.endTime.getTime() + 24 * 60 * 60 * 1000
            ),
            checkin: "",
            isComplete: false,
          },
        },
      },
      include: { iterations: true },
    });

    console.log("updatedLoop:", updatedLoop);
    return updatedLoop;
  } catch (error) {
    console.error("Error adding checkin:", error);
    throw new HttpError(500, "Error adding checkin");
  }
};

const getNextFridayDate = () => {
  const targetTime = new Date();
  targetTime.setUTCHours(17, 0, 0, 0); // Set target time to 5:00 PM UTC
  targetTime.setUTCDate(
    targetTime.getUTCDate() + ((5 + (7 - targetTime.getUTCDay())) % 7)
  ); // Set target date to the next Friday

  return targetTime;
};

const getNextFridayFromDate = (date) => {
  const targetDate = new Date(date);
  targetDate.setUTCHours(17, 0, 0, 0); // Set target time to 5:00 PM UTC
  targetDate.setUTCDate(
    targetDate.getUTCDate() + ((5 + (7 - targetDate.getUTCDay())) % 7)
  );
  return targetDate;
};
