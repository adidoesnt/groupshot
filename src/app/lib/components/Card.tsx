type CardProps = {
  children: React.ReactNode;
  title: {
    text: string;
    className?: string;
  };
  description: {
    text: string;
    className?: string;
  };
  className?: string;
};

export default function Card({ children, title, description, className }: CardProps) {
  return (
    <div className={`bg-background p-4 ${className}`}>
      <div className="">
        <h1 className={`text-2xl font-bold ${title.className}`}>
          {title.text}
        </h1>
        <p className={`text-sm ${description.className}`}>
          {description.text}
        </p>
      </div>
      <hr className="my-4" />
      <div className="flex flex-col gap-4 font-sans">{children}</div>
    </div>
  );
}
