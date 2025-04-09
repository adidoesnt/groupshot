"use client";

import { Amplify, type ResourcesConfig } from "aws-amplify";
import { COGNITO_CLIENT_ID, COGNITO_USER_POOL_ID } from "../constants";
import { createContext, useCallback } from "react";
import { signOut } from "aws-amplify/auth";
import { redirect } from "next/navigation";

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

type AmplifyContextType = {
  logout: () => Promise<void>;
};

const AmplifyContext = createContext<AmplifyContextType>({
  logout: async () => {},
});

type AmplifyProviderProps = {
  children: React.ReactNode;
};

export const AmplifyProvider = ({ children }: AmplifyProviderProps) => {
  const logout = useCallback(async () => {
    console.log("Logging out");

    try {
      await signOut();

      console.log("Logged out successfully");
      redirect("/login");
    } catch (error) {
      console.error("Error logging out", error);
    }
  }, []);

  return (
    <AmplifyContext.Provider value={{ logout }}>
      {children}
    </AmplifyContext.Provider>
  );
};
