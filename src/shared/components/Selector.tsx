import Select from "react-select";
import type { SelectorProps } from "./types";

const Selector = ({
  children,
  options,
  defaultValue,
  onChange,
}: SelectorProps) => {
  return (
    <div className="flex jusitfy-center items-center gap-4">
      <label className="text-sm text-gray-600 mb-1 block">{children}</label>
      <Select
        options={options}
        styles={{
          control: (provided) => ({
            ...provided,
            width: "110px",
          }),
          menu: (provided) => ({
            ...provided,
            width: "110px",
          }),
          option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isFocused ? "#3A5AFE" : "white",
            color: state.isFocused ? "white" : "black",
          }),
        }}
        isSearchable={false}
        defaultValue={defaultValue}
        onChange={onChange}
      />
    </div>
  );
};

export default Selector;
