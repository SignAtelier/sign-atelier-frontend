import type { ToggleSwitchProps } from "../sign/types";

const ToggleSwitch = ({ label, checked, onToggle }: ToggleSwitchProps) => {
  return (
    <div
      className="flex items-center gap-2 cursor-pointer select-none"
      onClick={onToggle}
    >
      <span className="text-sm text-gray-600">{label}</span>
      <div
        className={`w-10 h-6 flex items-center rounded-full p-1 transition-all ${
          checked ? "bg-green-400" : "bg-gray-300"
        }`}
      >
        <div
          className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
            checked ? "translate-x-4" : "translate-x-0"
          }`}
        />
      </div>
    </div>
  );
};

export default ToggleSwitch;
