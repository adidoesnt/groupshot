import StatefulSidebar from "@/app/lib/components/StatefulSidebar";
import { getUser } from "@/app/actions/getUser";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const user = await getUser();

  const hasCompletedOnboarding = user?.onboarding.steps.every(
    (step) => step.completedAt
  );

  if (!hasCompletedOnboarding) {
    redirect("/onboarding");
  }

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
