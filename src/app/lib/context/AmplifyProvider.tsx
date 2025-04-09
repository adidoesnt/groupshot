"use client";

import { Amplify } from "aws-amplify";
import { authConfig } from "../constants";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  AuthUser,
  signOut,
  getCurrentUser as getAuthUser,
  fetchUserAttributes,
  FetchUserAttributesOutput,
} from "aws-amplify/auth";
import { redirect } from "next/navigation";

Amplify.configure(
  {
    Auth: authConfig,
  },
  {
    ssr: true,
  }
);

export type User = AuthUser & FetchUserAttributesOutput;

type AmplifyContextType = {
  logout: () => Promise<void>;
  getCurrentUser: () => User | null;
  setCurrentUser: () => Promise<void>;
  isAuthenticated: boolean;
};

const AmplifyContext = createContext<AmplifyContextType>({
  logout: async () => {},
  getCurrentUser: () => null,
  setCurrentUser: async () => {},
  isAuthenticated: false,
});

type AmplifyProviderProps = {
  children: React.ReactNode;
};

export const AmplifyProvider = ({ children }: AmplifyProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  const logout = useCallback(async () => {
    console.log("Logging out");

    try {
      await signOut();
      setUser(null);

      console.log("Logged out successfully");
      redirect("/login");
    } catch (error) {
      console.error("Error logging out", error);
    }
  }, [setUser]);

  const getCurrentUser = useCallback(() => {
    return user;
  }, [user]);

  const setCurrentUser = useCallback(async () => {
    console.log("Setting current user");

    try {
      console.log("Getting auth user from amplify");
      const authUser = await getAuthUser();

      console.log("Fetching user attributes");
      const userAttributes = await fetchUserAttributes();

      const userToSet: User = {
        username: authUser.username,
        userId: authUser.userId,
        given_name: userAttributes.given_name!,
        family_name: userAttributes.family_name!,
        email: userAttributes.email!,
      };

      console.log("Setting current user", userToSet);
      setUser(userToSet);
    } catch (error) {
      console.error("Error setting current user", error);
    }
  }, []);

  const isAuthenticated = useMemo(() => {
    return !!getCurrentUser();
  }, [getCurrentUser]);

  const context = useMemo(
    () => ({ logout, getCurrentUser, setCurrentUser, isAuthenticated }),
    [logout, getCurrentUser, setCurrentUser, isAuthenticated]
  );

  useEffect(() => {
    setCurrentUser();
  }, [setCurrentUser]);

  return (
    <AmplifyContext.Provider value={context}>
      {children}
    </AmplifyContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AmplifyContext);

  if (!context) {
    throw new Error("useAuth must be used within an AmplifyProvider");
  }

  return context;
};
