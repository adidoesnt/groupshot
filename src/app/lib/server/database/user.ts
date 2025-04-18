import { User } from "@/app/prisma";
import prisma from "./prisma";

export const createUser = async (user: User) => {
  const newUser = await prisma.user.create({
    data: user,
  });

  return newUser;
};

export const updateUser = async (id: string, updates: Partial<User>) => {
  const updatedUser = await prisma.user.update({
    where: { id },
    data: updates,
  });

  return updatedUser;
};
