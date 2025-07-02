import type { ButtonProps } from "./types";

const Button = ({
  children,
  onClick,
  disabled = false,
  style = "bg-[#3a5afe] text-white",
}: ButtonProps) => {
  return (
    <button
      className={`border w-full py-3 rounded-lg  cursor-pointer ${style}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
