import config from "@/config";

type FooterProps = {
  className?: string;
};

export default function Footer({ className }: FooterProps) {
  const {
    layout: { footer },
  } = config;

  return (
    <footer className={`text-sm font-sans ${className}`}>{footer.text}</footer>
  );
}
