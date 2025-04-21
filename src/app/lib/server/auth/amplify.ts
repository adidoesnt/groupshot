import { cookies } from "next/headers";
import { createServerRunner } from "@aws-amplify/adapter-nextjs";
import { generateServerClientUsingCookies } from "@aws-amplify/adapter-nextjs/api";
import {
  getCurrentUser as getCurrentAuthUser,
  fetchUserAttributes,
  fetchAuthSession,
} from "aws-amplify/auth/server";
import { authConfig } from "../../constants";

export const { runWithAmplifyServerContext } = createServerRunner({
  config: {
    Auth: authConfig,
  },
});

export const cookiesClient = generateServerClientUsingCookies({
  config: {
    Auth: authConfig,
  },
  cookies,
});

export const getCurrentUser = async () => {
  try {
    const authUser = await runWithAmplifyServerContext({
      nextServerContext: { cookies },
      operation: (contextSpec) => getCurrentAuthUser(contextSpec),
    });

    const userAttributes = await runWithAmplifyServerContext({
      nextServerContext: { cookies },
      operation: (contextSpec) => fetchUserAttributes(contextSpec),
    });

    const session = await runWithAmplifyServerContext({
      nextServerContext: { cookies },
      operation: (contextSpec) => fetchAuthSession(contextSpec),
    });

    const groups = (session.tokens?.accessToken.payload["cognito:groups"] ||
      []) as string[];
    const isAdmin = groups.includes("admin");

    return {
      ...authUser,
      ...userAttributes,
      isAdmin,
    };
  } catch (error) {
    console.error(error);
  }
};
