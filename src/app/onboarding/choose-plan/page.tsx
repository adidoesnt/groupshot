import StatefulSidebar from "@/app/lib/components/StatefulSidebar";
import Plans from "../components/Plans";

export default function ChoosePlan() {
  return (
    <div className="flex w-[100dvw] h-[100dvh] bg-background text-foreground justify-center items-center overflow-y-auto overflow-x-hidden">
      <StatefulSidebar />
      <Plans />
    </div>
  );
}
