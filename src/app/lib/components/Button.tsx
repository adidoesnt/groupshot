type ButtonProps = {
  icon: React.ReactNode;
  onClick: () => void;
  children?: React.ReactNode;
  className?: string;
};

export default function Button({
  icon,
  onClick,
  children,
  className,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center gap-2 ${className}`}
    >
      {icon}
      {children}
    </button>
  );
}
