"use client";

import { Amplify, type ResourcesConfig } from "aws-amplify";
import { COGNITO_CLIENT_ID, COGNITO_USER_POOL_ID } from "../constants";

export const authConfig: ResourcesConfig["Auth"] = {
  Cognito: {
    userPoolId: COGNITO_USER_POOL_ID,
    userPoolClientId: COGNITO_CLIENT_ID,
  },
};

Amplify.configure(
  {
    Auth: authConfig,
  },
  {
    ssr: true,
  }
);

// TODO: React component to provide Amplify context
export const AmplifyProvider = () => {
  return null;
};
