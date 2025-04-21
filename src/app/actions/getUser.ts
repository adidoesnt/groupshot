"use server";

import { getCurrentUser } from "../lib/server/auth/amplify";
import { getUserById } from "../lib/server/database/user";

export async function getUser() {
  const authUser = await getCurrentUser();

  if (!authUser?.userId) {
    return null;
  }

  const dbUser = await getUserById(authUser.userId);

  return {
    ...authUser,
    ...dbUser,
  };
}
