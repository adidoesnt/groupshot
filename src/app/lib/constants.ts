import { ResourcesConfig } from "aws-amplify";

// Cognito
export const COGNITO_USER_POOL_ID =
  process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID ?? "";
export const COGNITO_AUTHORITY = process.env.NEXT_PUBLIC_COGNITO_AUTHORITY ?? "";
export const COGNITO_CLIENT_ID = process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID ?? "";
export const COGNITO_REDIRECT_URI =
  process.env.NEXT_PUBLIC_COGNITO_REDIRECT_URI ?? "";
export const COGNITO_RESPONSE_TYPE =
  process.env.NEXT_PUBLIC_COGNITO_RESPONSE_TYPE ?? "";
export const COGNITO_SCOPE = process.env.NEXT_PUBLIC_COGNITO_SCOPE ?? "";
export const COGNITO_DOMAIN = process.env.NEXT_PUBLIC_COGNITO_DOMAIN ?? "";

export const authConfig: ResourcesConfig["Auth"] = {
  Cognito: {
    userPoolId: COGNITO_USER_POOL_ID,
    userPoolClientId: COGNITO_CLIENT_ID,
  },
};
