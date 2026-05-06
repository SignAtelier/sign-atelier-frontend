import type { SignatureStyle } from "../../apis/types";
import type { StyleOption } from "./homeContent";

interface StyleSelectorProps {
  options: StyleOption[];
  selectedStyle: SignatureStyle;
  onSelectStyle: (style: SignatureStyle) => void;
}

const StyleSelector = ({
  options,
  selectedStyle,
  onSelectStyle,
}: StyleSelectorProps) => {
  return (
    <div>
      <div className="mb-4">
        <p className="text-lg font-black">스타일 선택</p>
        <p className="mt-1 text-sm text-stone-500">
          예시 이미지를 보고 원하는 스타일을 선택해주세요.
        </p>
      </div>

      <div className="grid grid-cols-4 gap-4 max-xl:grid-cols-2 max-sm:grid-cols-1">
        {options.map((option) => {
          const isSelected = selectedStyle === option.value;

          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={isSelected}
              onClick={() => onSelectStyle(option.value)}
              className={`overflow-hidden rounded-md border bg-white text-left transition ${
                isSelected
                  ? "border-stone-950 ring-2 ring-stone-200"
                  : "border-stone-200 hover:border-stone-500"
              }`}
            >
              <div className="flex h-64 items-center justify-center bg-[#fffaf1] p-4 max-xl:h-52 max-sm:h-40">
                <img
                  src={option.image}
                  alt={`${option.label} 스타일 예시`}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <div
                className={`flex items-center justify-between px-4 py-3 text-sm font-bold ${
                  isSelected
                    ? "bg-stone-950 text-[#f8f3ea]"
                    : "text-stone-700"
                }`}
              >
                <span>{option.label}</span>
                {isSelected && <span>선택됨</span>}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default StyleSelector;
