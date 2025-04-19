"use client";

import { useAuth } from "../lib/context/AmplifyProvider";
import StatefulSidebar from "../lib/components/StatefulSidebar";
import { useUserProfile } from "../lib/context/UserProvider";
import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const { getCurrentUser } = useAuth();
  const user = getCurrentUser();

  const { getUserProfile } = useUserProfile();
  const userProfile = getUserProfile();

  const onboardingComplete = useMemo(() => {
    return userProfile?.onboarding?.steps.every((step) => step.completedAt);
  }, [userProfile]);

  const router = useRouter();

  useEffect(() => {
    if (!onboardingComplete) {
      router.push(`/onboarding`);
    }
  }, [onboardingComplete, router, userProfile]);

  return (
    <main className="grid w-[100dvw] h-[100dvh] bg-background text-foreground place-items-center">
      <StatefulSidebar />
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold font-mono">Dashboard</h1>
        <p className="text-sm font-sans">Welcome {user?.given_name}!</p>
      </div>
    </main>
  );
}
