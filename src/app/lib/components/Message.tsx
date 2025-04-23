import { cn } from "@/app/lib/utils/cn";

type MessageProps = {
  type: "success" | "error";
  message: string;
  className?: string;
};

export default function Message({ type, message, className }: MessageProps) {
  return (
    <div
      className={cn(
        "p-4 rounded-lg border-2 flex items-center gap-2",
        {
          "bg-green-50 border-green-200 text-green-800": type === "success",
          "bg-red-50 border-red-200 text-red-800": type === "error",
        },
        className
      )}
    >
      <div
        className={cn("w-2 h-2 rounded-full", {
          "bg-green-500": type === "success",
          "bg-red-500": type === "error",
        })}
      />
      <span className="text-sm font-medium font-sans">{message}</span>
    </div>
  );
}
