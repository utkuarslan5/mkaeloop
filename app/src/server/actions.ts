import { type User, type Task, type File, type Loop, type Iteration, type Checkin } from 'wasp/entities';
import { HttpError } from 'wasp/server';
import {
  type GenerateGptResponse,
  type StripePayment,
  type UpdateCurrentUser,
  type UpdateUserById,
  type CreateTask,
  type DeleteTask,
  type UpdateTask,
  type CreateFile,
  type CreateLoop,
  type DeleteLoop,
  type DeactivateLoop,
  type JoinLoop,
  type WatchLoop,
  type LeaveLoop,
  type UnwatchLoop,
  type CreateIteration,
  type CreateCheckin,
  type CreateIterations,
} from 'wasp/server/operations';
import Stripe from 'stripe';
import type { GeneratedSchedule, StripePaymentResult } from '../shared/types';
import { fetchStripeCustomer, createStripeCheckoutSession } from './payments/stripeUtils.js';
import { TierIds } from '../shared/constants.js';
import { getUploadFileSignedURLFromS3 } from './file-upload/s3Utils.js';
import OpenAI from 'openai';

export const createLoop = async (
  args: { name: string; projectType: string; numIterations: number; frequency: string; createdById: number },
  context: any
) => {
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
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new HttpError(500, error.message);
    } else {
      throw new HttpError(500, 'An unknown error occurred');
    }
  }
};

export const joinLoop = async (args: { user: User; loop: Loop }, context: { entities: { Loop: any } }) => {
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
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new HttpError(500, error.message);
    } else {
      throw new HttpError(500, 'An unknown error occurred');
    }
  }
};
export const watchLoop = async (args: { user: User; loop: Loop }, context: { entities: { Loop: any } }) => {
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
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new HttpError(500, error.message);
    } else {
      throw new HttpError(500, 'An unknown error occurred');
    }
  }
};
export const leaveLoop = async (args: { user: User; loop: Loop }, context: { entities: { Loop: any } }) => {
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
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new HttpError(500, error.message);
    } else {
      throw new HttpError(500, 'An unknown error occurred');
    }
  }
};
export const unwatchLoop = async (args: { user: User; loop: Loop }, context: { entities: { Loop: any } }) => {
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
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new HttpError(500, error.message);
    } else {
      throw new HttpError(500, 'An unknown error occurred');
    }
  }
};
export const deleteLoop = async (
  args: { loop: Loop; user: User },
  context: { entities: { Loop: any; Checkin: any; Iteration: any } }
) => {
  try {
    const { loop, user } = args;
    console.log('Deleting loop:', loop);
    const loopToDelete = await context.entities.Loop.findUnique({
      where: { id: loop.id },
      include: { iterations: { include: { checkins: true } } },
    });

    if (!loopToDelete) {
      console.error(`Loop with id ${loop.id} not found`);
      throw new HttpError(404, `Loop with id ${loop.id} not found`);
    }

    if (loopToDelete.createdById !== user.id) {
      console.error('You can only delete loops that you created.');
      throw new HttpError(403, 'You can only delete loops that you created.');
    }

    console.log('Deleting checkins for loop:', loop.id);
    for (const iteration of loopToDelete.iterations) {
      await context.entities.Checkin.deleteMany({
        where: { iterationId: iteration.id },
      });
    }

    console.log('Deleting iterations for loop:', loop.id);
    await context.entities.Iteration.deleteMany({
      where: { loopId: loop.id },
    });

    console.log('Deleting loop:', loop.id);
    const deletedLoop = await context.entities.Loop.delete({
      where: { id: loop.id },
    });
    console.log('Loop deleted:', deletedLoop);
    return deletedLoop;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new HttpError(500, error.message);
    } else {
      throw new HttpError(500, 'An unknown error occurred');
    }
  }
};

export const deactivateLoop = async (args: { loop: Loop; user: User }, context: { entities: { Loop: any } }) => {
  try {
    const { loop, user } = args;
    const loopToDeactivate = await context.entities.Loop.findUnique({
      where: { id: loop.id },
    });

    if (!loopToDeactivate) {
      throw new HttpError(404, `Loop with id ${loop.id} not found`);
    }

    if (loopToDeactivate.createdById !== user.id) {
      throw new HttpError(403, 'You can only deactivate loops that you created.');
    }

    const deactivatedLoop = await context.entities.Loop.update({
      where: { id: loop.id },
      data: { isActive: false },
    });
    return deactivatedLoop;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new HttpError(500, error.message);
    } else {
      throw new HttpError(500, 'An unknown error occurred');
    }
  }
};

export const createIterations = async (args: { loop: Loop }, context: { entities: { Loop: any; Iteration: any } }) => {
  const loop = args.loop;
  const now = new Date();
  const endDate = new Date(now);

  switch (loop.frequency) {
    case 'daily':
      endDate.setDate(now.getDate() + loop.numIterations);
      break;
    case 'weekly':
      endDate.setDate(now.getDate() + loop.numIterations * 7);
      break;
    case 'monthly':
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
      case 'daily':
        startTime.setDate(now.getDate() + i);
        endTime.setDate(now.getDate() + i + 1);
        break;
      case 'weekly':
        startTime.setDate(now.getDate() + i * 7);
        endTime.setDate(now.getDate() + (i + 1) * 7);
        break;
      case 'monthly':
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
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new HttpError(500, error.message);
      } else {
        throw new HttpError(500, 'An unknown error occurred');
      }
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
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new HttpError(500, error.message);
    } else {
      throw new HttpError(500, 'An unknown error occurred');
    }
  }
};

export const createIteration = async (
  args: { loopId: number; startTime: Date; endTime: Date },
  context: { entities: { Iteration: any } }
) => {
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
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new HttpError(500, error.message);
    } else {
      throw new HttpError(500, 'An unknown error occurred');
    }
  }
};

export const createCheckin = async (
  args: { iterationId: number; userId: number; proofOfWork: string },
  context: { entities: { Checkin: any; Iteration: any } }
) => {
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
            id: args.userId,
          },
        },
        proofOfWork: args.proofOfWork,
      },
    });

    await context.entities.Iteration.update({
      where: { id: args.iterationId },
      data: { completed: true },
    });

    const updatedIteration = await context.entities.Iteration.findUnique({
      where: { id: args.iterationId },
    });
    return checkin;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new HttpError(500, error.message);
    } else {
      throw new HttpError(500, 'An unknown error occurred');
    }
  }
};
""
const openai = setupOpenAI();
function setupOpenAI() {
  if (!process.env.OPENAI_API_KEY) {
    return new HttpError(500, 'OpenAI API key is not set');
  }
  return new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
}

export const stripePayment: StripePayment<string, StripePaymentResult> = async (tier, context) => {
  if (!context.user) {
    throw new HttpError(401);
  }
  const userEmail = context.user.email;
  if (!userEmail) {
    throw new HttpError(
      403,
      'User needs an email to make a payment. If using the usernameAndPassword Auth method, switch to an Auth method that provides an email.'
    );
  }

  let priceId;
  if (tier === TierIds.HOBBY) {
    priceId = process.env.HOBBY_SUBSCRIPTION_PRICE_ID!;
  } else if (tier === TierIds.PRO) {
    priceId = process.env.PRO_SUBSCRIPTION_PRICE_ID!;
  } else if (tier === TierIds.CREDITS) {
    priceId = process.env.CREDITS_PRICE_ID!;
  } else {
    throw new HttpError(404, 'Invalid tier');
  }

  let customer: Stripe.Customer | undefined;
  let session: Stripe.Checkout.Session | undefined;
  try {
    customer = await fetchStripeCustomer(userEmail);
    if (!customer) {
      throw new HttpError(500, 'Error fetching customer');
    }
    session = await createStripeCheckoutSession({
      priceId,
      customerId: customer.id,
      mode: tier === TierIds.CREDITS ? 'payment' : 'subscription',
    });
    if (!session) {
      throw new HttpError(500, 'Error creating session');
    }
  } catch (error: any) {
    const statusCode = error.statusCode || 500;
    const errorMessage = error.message || 'Internal server error';
    throw new HttpError(statusCode, errorMessage);
  }

  const updatedUser = await context.entities.User.update({
    where: {
      id: context.user.id,
    },
    data: {
      checkoutSessionId: session.id,
      stripeId: customer.id,
    },
  });

  return {
    sessionUrl: session.url,
    sessionId: session.id,
  };
};

type GptPayload = {
  hours: string;
};

export const generateGptResponse: GenerateGptResponse<GptPayload, GeneratedSchedule> = async ({ hours }, context) => {
  if (!context.user) {
    throw new HttpError(401);
  }

  const tasks = await context.entities.Task.findMany({
    where: {
      user: {
        id: context.user.id,
      },
    },
  });

  const parsedTasks = tasks.map(({ description, time }) => ({
    description,
    time,
  }));

  try {
    // check if openai is initialized correctly with the API key
    if (openai instanceof Error) {
      throw openai;
    }

    if (!context.user.subscriptionStatus && !context.user.credits) {
      throw new HttpError(402, 'User has not paid or is out of credits');
    } else if (context.user.credits && !context.user.subscriptionStatus) {
      console.log('decrementing credits');
      await context.entities.User.update({
        where: { id: context.user.id },
        data: {
          credits: {
            decrement: 1,
          },
        },
      });
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo', // you can use any model here, e.g. 'gpt-3.5-turbo', 'gpt-4', etc. 
      messages: [
        {
          role: 'system',
          content:
            'you are an expert daily planner. you will be given a list of main tasks and an estimated time to complete each task. You will also receive the total amount of hours to be worked that day. Your job is to return a detailed plan of how to achieve those tasks by breaking each task down into at least 3 subtasks each. MAKE SURE TO ALWAYS CREATE AT LEAST 3 SUBTASKS FOR EACH MAIN TASK PROVIDED BY THE USER! YOU WILL BE REWARDED IF YOU DO.',
        },
        {
          role: 'user',
          content: `I will work ${hours} hours today. Here are the tasks I have to complete: ${JSON.stringify(
            parsedTasks
          )}. Please help me plan my day by breaking the tasks down into actionable subtasks with time and priority status.`,
        },
      ],
      tools: [
        {
          type: 'function',
          function: {
            name: 'parseTodaysSchedule',
            description: 'parses the days tasks and returns a schedule',
            parameters: {
              type: 'object',
              properties: {
                mainTasks: {
                  type: 'array',
                  description: 'Name of main tasks provided by user, ordered by priority',
                  items: {
                    type: 'object',
                    properties: {
                      name: {
                        type: 'string',
                        description: 'Name of main task provided by user',
                      },
                      priority: {
                        type: 'string',
                        enum: ['low', 'medium', 'high'],
                        description: 'task priority',
                      },
                    },
                  },
                },
                subtasks: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      description: {
                        type: 'string',
                        description:
                          'detailed breakdown and description of sub-task related to main task. e.g., "Prepare your learning session by first reading through the documentation"',
                      },
                      time: {
                        type: 'number',
                        description: 'time allocated for a given subtask in hours, e.g. 0.5',
                      },
                      mainTaskName: {
                        type: 'string',
                        description: 'name of main task related to subtask',
                      },
                    },
                  },
                },
              },
              required: ['mainTasks', 'subtasks', 'time', 'priority'],
            },
          },
        },
      ],
      tool_choice: {
        type: 'function',
        function: {
          name: 'parseTodaysSchedule',
        },
      },
      temperature: 1,
    });

    const gptArgs = completion?.choices[0]?.message?.tool_calls?.[0]?.function.arguments;

    if (!gptArgs) {
      throw new HttpError(500, 'Bad response from OpenAI');
    }

    console.log('gpt function call arguments: ', gptArgs);

    await context.entities.GptResponse.create({
      data: {
        user: { connect: { id: context.user.id } },
        content: JSON.stringify(gptArgs),
      },
    });

    return JSON.parse(gptArgs);
  } catch (error: any) {
    if (!context.user.subscriptionStatus && error?.statusCode != 402) {
      await context.entities.User.update({
        where: { id: context.user.id },
        data: {
          credits: {
            increment: 1,
          },
        },
      });
    }
    console.error(error);
    const statusCode = error.statusCode || 500;
    const errorMessage = error.message || 'Internal server error';
    throw new HttpError(statusCode, errorMessage);
  }
};

export const createTask: CreateTask<Pick<Task, 'description'>, Task> = async ({ description }, context) => {
  if (!context.user) {
    throw new HttpError(401);
  }

  const task = await context.entities.Task.create({
    data: {
      description,
      user: { connect: { id: context.user.id } },
    },
  });

  return task;
};

export const updateTask: UpdateTask<Partial<Task>, Task> = async ({ id, isDone, time }, context) => {
  if (!context.user) {
    throw new HttpError(401);
  }

  const task = await context.entities.Task.update({
    where: {
      id,
    },
    data: {
      isDone,
      time,
    },
  });

  return task;
};

export const deleteTask: DeleteTask<Pick<Task, 'id'>, Task> = async ({ id }, context) => {
  if (!context.user) {
    throw new HttpError(401);
  }

  const task = await context.entities.Task.delete({
    where: {
      id,
    },
  });

  return task;
};

export const updateUserById: UpdateUserById<{ id: number; data: Partial<User> }, User> = async (
  { id, data },
  context
) => {
  if (!context.user) {
    throw new HttpError(401);
  }

  if (!context.user.isAdmin) {
    throw new HttpError(403);
  }

  const updatedUser = await context.entities.User.update({
    where: {
      id,
    },
    data,
  });

  return updatedUser;
};

type fileArgs = {
  fileType: string;
  name: string;
};

export const createFile: CreateFile<fileArgs, File> = async ({ fileType, name }, context) => {
  if (!context.user) {
    throw new HttpError(401);
  }

  const userInfo = context.user.id.toString();

  const { uploadUrl, key } = await getUploadFileSignedURLFromS3({ fileType, userInfo });

  return await context.entities.File.create({
    data: {
      name,
      key,
      uploadUrl,
      type: fileType,
      user: { connect: { id: context.user.id } },
    },
  });
};

export const updateCurrentUser: UpdateCurrentUser<Partial<User>, User> = async (user, context) => {
  if (!context.user) {
    throw new HttpError(401);
  }

  return context.entities.User.update({
    where: {
      id: context.user.id,
    },
    data: user,
  });
};
