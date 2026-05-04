import type { ButtonProps } from "./types";

const Button = ({
  children,
  onClick,
  disabled = false,
  style = "bg-stone-950 text-white hover:bg-stone-800 shadow-sm",
  padding = "py-3",
}: ButtonProps) => {
  return (
    <button
      className={`w-full rounded-md cursor-pointer font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${style} ${padding}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
