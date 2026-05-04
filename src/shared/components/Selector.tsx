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
      <label className="mb-1 block text-sm text-stone-600">{children}</label>
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
            backgroundColor: state.isFocused ? "#292524" : "white",
            color: state.isFocused ? "#fffaf1" : "#1c1917",
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
