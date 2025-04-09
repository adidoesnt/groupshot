export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="flex flex-col items-center gap-6">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-primary/20 rounded-full" />
          <div className="absolute top-0 left-0 w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-primary rounded-full" />
        </div>
        <div className="flex flex-col items-center gap-2">
          <p className="text-lg font-medium text-foreground">Loading</p>
          <p className="text-sm text-muted-foreground">
            Please wait while we prepare your experience
          </p>
        </div>
      </div>
    </div>
  );
}
