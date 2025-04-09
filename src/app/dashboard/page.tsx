"use client";

import { useAuth } from "../lib/context/AmplifyProvider";
import StatefulSidebar from "../lib/components/StatefulSidebar";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const { getCurrentUser, isAuthenticated } = useAuth();
  const user = getCurrentUser();

  if (!isAuthenticated) router.push("/login");

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
