import { User } from "@/app/prisma";
import prisma from "./prisma";

export const createUser = async (user: User) => {
  const newUser = await prisma.user.create({
    data: user,
  });

  return newUser;
};
