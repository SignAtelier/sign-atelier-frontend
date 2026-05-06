import type { ChangeEvent } from "react";
import type { SignatureStyle } from "../../apis/types";
import Input from "../../shared/components/Input";
import GenerateSummary from "./GenerateSummary";
import type { StyleOption } from "./homeContent";
import StyleSelector from "./StyleSelector";

interface SignCreationPanelProps {
  name: string;
  styleOptions: StyleOption[];
  selectedStyle: SignatureStyle;
  selectedStyleLabel: string;
  canSubmit: boolean;
  onChangeName: (event: ChangeEvent<HTMLInputElement>) => void;
  onSelectStyle: (style: SignatureStyle) => void;
  onGenerate: () => void;
}

const SignCreationPanel = ({
  name,
  styleOptions,
  selectedStyle,
  selectedStyleLabel,
  canSubmit,
  onChangeName,
  onSelectStyle,
  onGenerate,
}: SignCreationPanelProps) => {
  return (
    <section className="rounded-md border border-stone-200 bg-white p-6 shadow-xl shadow-stone-900/5">
      <div className="text-left">
        <div className="mb-6 grid grid-cols-[minmax(280px,420px)_1fr] gap-8 border-b border-stone-200 pb-6 max-lg:grid-cols-1">
          <div>
            <p className="text-xl font-black">싸인 만들기</p>
            <p className="mt-2 text-sm leading-6 text-stone-500">
              영문 이름을 먼저 입력한 다음, 아래에서 원하는 스타일을
              선택해주세요.
            </p>
          </div>
          <div>
            <label className="mb-3 block text-sm font-bold text-stone-900">
              영문 이름
            </label>
            <Input
              onChange={onChangeName}
              placeholder="예: Daniel"
              value={name}
            />
          </div>
        </div>

        <StyleSelector
          options={styleOptions}
          selectedStyle={selectedStyle}
          onSelectStyle={onSelectStyle}
        />

        <GenerateSummary
          name={name}
          selectedStyleLabel={selectedStyleLabel}
          canSubmit={canSubmit}
          onGenerate={onGenerate}
        />
      </div>
    </section>
  );
};

export default SignCreationPanel;
