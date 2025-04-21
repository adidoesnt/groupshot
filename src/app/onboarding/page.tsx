import StatefulSidebar from "../lib/components/StatefulSidebar";
import Card from "../lib/components/Card";
import config from "../lib/config";
import OnboardingChecklist from "./components/OnboardingChecklist";
import { getUser } from "@/app/actions/getUser";
import { redirect } from "next/navigation";

const { onboarding } = config;

export default async function Onboarding() {
  const user = await getUser();

  const hasCompletedOnboarding = user?.onboarding.steps.every(
    (step) => step.completedAt
  );

  if (hasCompletedOnboarding) {
    redirect("/dashboard");
  }

  const title = `${user?.firstName}'s ${onboarding.title}`;

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
          <OnboardingChecklist onboarding={user?.onboarding} />
        </Card>
      </div>
    </main>
  );
}
