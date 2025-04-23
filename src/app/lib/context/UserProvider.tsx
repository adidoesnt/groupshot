"use client";

import {
  createContext,
  useState,
  useCallback,
  useEffect,
  useMemo,
  useContext,
} from "react";
import { useAuth } from "./AmplifyProvider";
import { UserWithOnboarding } from "@/app/api/user/types";

export type UserProfile = UserWithOnboarding;

type UserContextType = {
  setUserProfile: (userProfile: UserProfile) => void;
  getUserProfile: () => UserProfile | null;
};

const UserContext = createContext<UserContextType>({
  getUserProfile: () => null,
  setUserProfile: () => {},
});

type UserProviderProps = {
  children: React.ReactNode;
};

export const UserProvider = ({ children }: UserProviderProps) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const { getCurrentUser } = useAuth();

  useEffect(() => {
    try {
      const currentUser = getCurrentUser();

      if (currentUser) {
        fetch(`/api/user/${currentUser.userId}`)
          .then((res) => {
            if (res.ok) {
              res.json().then((data) => {
                setUserProfile(data);
              });
            }
          })
          .catch((err) => {
            console.error("Error fetching user profile", err);
          });
      } else {
        setUserProfile(null);
      }
    } catch (error) {
      console.error("Error fetching user profile", error);
    }
  }, [getCurrentUser]);

  const getUserProfile = useCallback(() => {
    return userProfile;
  }, [userProfile]);

  const context = useMemo(
    () => ({
      setUserProfile,
      getUserProfile,
    }),
    [setUserProfile, getUserProfile]
  );

  return (
    <UserContext.Provider value={context}>{children}</UserContext.Provider>
  );
};

export const useUserProfile = () => {
  const { setUserProfile, getUserProfile } = useContext(UserContext);

  return { setUserProfile, getUserProfile };
};
