import type { ButtonProps } from "./types";

const Button = ({
  children,
  onClick,
  disabled = false,
  style = "bg-[#3a5afe] text-white",
  padding = "py-3",
}: ButtonProps) => {
  return (
    <button
      className={`border w-full rounded-lg cursor-pointer ${style} ${padding}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
