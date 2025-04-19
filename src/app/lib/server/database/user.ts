import { Prisma, User } from "@/app/prisma";
import prisma from "./prisma";

export const createUser = async (user: User) => {
  console.log("Creating user", user);

  return await prisma.$transaction(async (tx) => {
    const newUser = await tx.user.create({
      data: user,
    });

    const onboardingSteps = await tx.onboardingStep.findMany({
      orderBy: {
        id: "asc",
      },
    });

    const onboarding = await tx.onboarding.create({
      data: {
        userId: newUser.id,
        steps: {
          createMany: {
            data: onboardingSteps.map((step) => ({
              name: step.name,
              stepId: step.id,
            })),
          },
        },
      },
    });

    console.log("Created user", {
      user: newUser,
      onboarding,
    });

    return {
      user: newUser,
      onboarding,
    };
  });
};

export const getUserById = async (id: string, include?: Prisma.UserInclude) => {
  console.log("Getting user by ID", id);
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    include,
  });

  console.log("Fetched user", user);
  return user;
};
