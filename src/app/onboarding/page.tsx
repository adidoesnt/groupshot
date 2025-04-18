"use client";

import { useAuth } from "../lib/context/AmplifyProvider";
import StatefulSidebar from "../lib/components/StatefulSidebar";
import { useUserProfile } from "../lib/context/UserProvider";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Onboarding() {
  const { getCurrentUser } = useAuth();
  const user = getCurrentUser();

  const { getUserProfile } = useUserProfile();
  const userProfile = getUserProfile();

  const router = useRouter();

  useEffect(() => {
    if (userProfile?.onboardingCompleted) {
      router.push(`/dashboard`);
    }
  }, [userProfile, router]);

  return (
    <main className="grid w-[100dvw] h-[100dvh] bg-background text-foreground place-items-center">
      <StatefulSidebar />
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold font-mono">Onboarding</h1>
        <p className="text-sm font-sans">
          Welcome {user?.given_name}! We just have a few more things to set up.
        </p>
      </div>
    </main>
  );
}
