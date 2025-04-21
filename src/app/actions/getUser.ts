"use server";

import { getCurrentUser } from "@/app/lib/server/auth/amplify";
import { getUserById } from "@/app/lib/server/database/user";
import type { UserWithOnboarding } from "@/app/api/user/types";

export async function getUser() {
  const authUser = await getCurrentUser();

  if (!authUser?.userId) {
    return null;
  }

  const dbUser = (await getUserById(authUser.userId, {
    onboarding: {
      include: {
        steps: true,
      },
    },
  })) as UserWithOnboarding;

  return {
    ...authUser,
    ...dbUser,
  };
}
