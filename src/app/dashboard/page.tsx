"use client";

import { useAuth } from "../lib/context/AmplifyProvider";

export default function Dashboard() {
  const { getCurrentUser } = useAuth();

  const user = getCurrentUser();

  return (
    <main className="grid w-[100dvw] h-[100dvh] bg-background text-foreground place-items-center">
      <h1>Dashboard</h1>
      <p>Welcome {user?.email}</p>
    </main>
  );
}
