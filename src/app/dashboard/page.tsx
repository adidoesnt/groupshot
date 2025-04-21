
import StatefulSidebar from "@/app/lib/components/StatefulSidebar";
import { getUser } from "@/app/actions/getUser";

export default async function Dashboard() {
  const user = await getUser();

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
