import Footer from "@/app/lib/components/Footer";
import config from "@/app/lib/config";
import "./globals.css";
import Link from "next/link";

export default function Home() {
  const {
    app: { name, emoji, description, callToAction },
  } = config;

  return (
    <main className="grid w-[100dvw] h-[100dvh] bg-background text-foreground place-items-center">
      <div className="flex flex-col items-start gap-2 text-left">
        <h1 className="font-mono font-bold text-4xl">
          <span className="inline-block animate-flash">{emoji}</span> {name}
        </h1>
        <p className="text-sm font-sans">{description}</p>
        <p className="text-sm font-sans">
          <Link
            className="text-primary-action"
            href={callToAction.buttonText.href}
          >
            <span className="hover:opacity-50 transition-all duration-300">
              {callToAction.buttonText.text}
            </span>
          </Link>{" "}
          <span className="text-muted-foreground">{callToAction.text}</span>
        </p>
      </div>

      <Footer className="fixed bottom-0 left-0 p-2" />
    </main>
  );
}
