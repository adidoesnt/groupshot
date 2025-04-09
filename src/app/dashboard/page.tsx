"use client";

import { useAuth } from "../lib/context/AmplifyProvider";

export default function Dashboard() {
  const { getCurrentUser } = useAuth();

  const user = getCurrentUser();

  return (
    <main className="grid w-[100dvw] h-[100dvh] bg-background text-foreground place-items-center">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold font-mono">Dashboard</h1>
        <p className="text-sm font-sans">Welcome {user?.given_name}!</p>
      </div>
    </main>
  );
}
