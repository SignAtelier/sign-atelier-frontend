import type { ButtonProps } from "./types";

const Button = ({ children, onClick, disabled = false }: ButtonProps) => {
  return (
    <button
      className="text-white border w-full py-3"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
