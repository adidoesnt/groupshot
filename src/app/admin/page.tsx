"use client";

import StatefulSidebar from "../lib/components/StatefulSidebar";

export default function Dashboard() {
  return (
    <main className="grid w-[100dvw] h-[100dvh] bg-background text-foreground place-items-center">
      <StatefulSidebar />
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold font-mono">Admin</h1>
        <p className="text-sm font-sans">Welcome Admin!</p>
      </div>
    </main>
  );
}
