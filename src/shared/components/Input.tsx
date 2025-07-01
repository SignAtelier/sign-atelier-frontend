import { type ChangeEventHandler } from "react";

const inputClass = `
  flex-grow border border-gray-500 rounded-md px-3 py-3 focus:outline-[#3a5afe]
`;

interface InputProps {
  type?: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  placeholder: string;
}

const Input = ({ type = "text", value, onChange, placeholder }: InputProps) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={inputClass}
    />
  );
};

export default Input;
