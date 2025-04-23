type ButtonProps = {
  icon?: React.ReactNode;
  onClick: () => void;
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
};

export default function Button({
  icon,
  onClick,
  children,
  className,
  disabled,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center justify-center gap-2 cursor-pointer ${className} ${disabled ? "cursor-not-allowed opacity-50" : ""}`}
    >
      {icon}
      {children}
    </button>
  );
}
