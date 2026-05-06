import { LuPenLine } from "react-icons/lu";
import Button from "../../shared/components/Button";

interface GenerateSummaryProps {
  name: string;
  selectedStyleLabel: string;
  canSubmit: boolean;
  onGenerate: () => void;
}

const GenerateSummary = ({
  name,
  selectedStyleLabel,
  canSubmit,
  onGenerate,
}: GenerateSummaryProps) => {
  const trimmedName = name.trim();

  return (
    <div className="mt-6 flex items-center justify-between gap-4 rounded-md border border-stone-200 bg-[#fffaf1] p-4 max-sm:flex-col max-sm:items-stretch">
      <div className="text-sm font-semibold text-stone-600">
        {trimmedName ? (
          <div className="flex flex-wrap items-center gap-2">
            <span>생성 정보</span>
            <span className="rounded-md bg-white px-2.5 py-1 font-black text-stone-950">
              {trimmedName}
            </span>
            <span className="text-stone-400">/</span>
            <span className="rounded-md bg-white px-2.5 py-1 font-black text-stone-950">
              {selectedStyleLabel}
            </span>
          </div>
        ) : (
          "영문 이름을 입력하면 선택한 스타일로 싸인을 생성할 수 있습니다."
        )}
      </div>
      <div className="w-full max-w-xs">
        <Button onClick={onGenerate} disabled={!canSubmit} padding="py-4">
          <span className="flex items-center justify-center gap-2">
            <LuPenLine size={18} />
            생성하기
          </span>
        </Button>
      </div>
    </div>
  );
};

export default GenerateSummary;
