import { Prisma, User } from "@/app/prisma";
import prisma from "./prisma";

export const createUser = async (user: User) => {
  console.log("Creating user", user);
  const newUser = await prisma.user.create({
    data: user,
  });

  console.log("Created user", newUser);
  return newUser;
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
