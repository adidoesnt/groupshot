import { createServerRunner, NextServer } from "@aws-amplify/adapter-nextjs";
import { getCurrentUser, fetchAuthSession } from "aws-amplify/auth/server";
import { authConfig } from "../../constants";

export const { runWithAmplifyServerContext } = createServerRunner({
  config: {
    Auth: authConfig,
  },
});

export const checkIsAuthenticated = async (context: NextServer.Context) => {
  return await runWithAmplifyServerContext({
    nextServerContext: context,
    operation: async (contextSpec) => {
      try {
        const session = await fetchAuthSession(contextSpec);
        console.log("Fetched session", session);
        if (!session.tokens) return null;

        const groups = (session.tokens.accessToken.payload["cognito:groups"] ||
          []) as string[];

        const user = {
          ...(await getCurrentUser(contextSpec)),
          isAdmin: groups.includes("admin"),
        };

        console.log("Fetched user", user);
        return user;
      } catch (error) {
        console.error("Error checking if user is authenticated", error);
        return null;
      }
    },
  });
};
