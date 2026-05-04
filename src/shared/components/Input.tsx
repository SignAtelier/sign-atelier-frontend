import type { InputProps } from "./types";

const inputClass = `
  w-full border border-stone-300 bg-white rounded-md px-4 py-3
  text-stone-950 placeholder:text-stone-400 shadow-sm
  focus:border-stone-950 focus:bg-[#fffdf8] focus:outline-none focus:ring-2 focus:ring-stone-200
`;

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
