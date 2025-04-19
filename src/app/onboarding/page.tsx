"use client";

import StatefulSidebar from "../lib/components/StatefulSidebar";
import { useUserProfile } from "../lib/context/UserProvider";
import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import Card from "../lib/components/Card";
import config from "../lib/config";
import OnboardingChecklist from "./components/OnboardingChecklist";

const { onboarding } = config;

export default function Onboarding() {
  const { getUserProfile } = useUserProfile();
  const userProfile = getUserProfile();

  const title = useMemo(() => {
    return `${userProfile?.firstName}'s ${onboarding.title}`;
  }, [userProfile]);

  const onboardingComplete = useMemo(() => {
    return userProfile?.onboarding?.steps.every((step) => step.completedAt);
  }, [userProfile]);

  const router = useRouter();

  useEffect(() => {
    if (onboardingComplete) {
      router.push(`/dashboard`);
    }
  }, [onboardingComplete, router]);

  return (
    <main className="grid w-[100dvw] h-[100dvh] bg-background text-foreground place-items-center">
      <StatefulSidebar />
      <div className="flex flex-col gap-4">
        <Card
          title={{
            text: title,
            className: "text-text-primary font-mono",
          }}
          description={{
            text: onboarding.description,
            className: "text-primary-action font-sans",
          }}  
          className="bg-background-alt"
        >
          <OnboardingChecklist onboarding={userProfile?.onboarding} />
        </Card>
      </div>
    </main>
  );
}
