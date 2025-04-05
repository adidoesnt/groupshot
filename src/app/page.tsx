import Footer from "@/components/Footer";
import config from "@/config";

export default function Home() {
  const {
    app: { name, description, callToAction },
  } = config;

  return (
    <main className="grid w-[100dvw] h-[100dvh] bg-background text-foreground place-items-center">
      <div className="flex flex-col items-start gap-2 text-left">
        <h1 className="font-mono font-bold text-4xl">{name}</h1>
        <p className="text-sm font-sans">{description}</p>
        <p className="text-sm font-sans">
          <a className="text-primary-action" href={callToAction.buttonText.href}>
            {callToAction.buttonText.text}{" "}
          </a>
          <span className="text-muted-foreground">{callToAction.text}</span>
        </p>
      </div>

      <Footer className="fixed bottom-0 left-0 p-2" />
    </main>
  );
}
