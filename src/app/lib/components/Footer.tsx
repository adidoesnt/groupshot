import config from "@/app/lib/config";
import Link from "next/link";

type FooterProps = {
  className?: string;
};

export default function Footer({ className }: FooterProps) {
  const {
    layout: { footer },
  } = config;

  return (
    <footer
      className={`flex text-xs items-start md:text-sm md:flex-row flex-col w-full justify-between md:items-center font-sans ${className}`}
    >
      <p>{footer.text}</p>
      <p>
        Icons by{" "}
        <Link
          className="underline hover:opacity-50 transition-all duration-300"
          href="https://icons8.com"
          target="_blank"
        >
          Icons8
        </Link>
        .
      </p>
    </footer>
  );
}
