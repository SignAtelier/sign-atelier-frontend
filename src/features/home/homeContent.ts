import type { SignatureStyle } from "../../apis/types";
import calligraphyPreview from "../../assets/calligraphy.png";
import luxuryPreview from "../../assets/luxury.png";
import sharpPreview from "../../assets/sharp.png";
import simplePreview from "../../assets/simple.png";

export interface StyleOption {
  value: SignatureStyle;
  label: string;
  image: string;
}

export interface ProcessStep {
  title: string;
  description: string;
}

export const styleOptions: StyleOption[] = [
  { value: "luxury", label: "우아하게", image: luxuryPreview },
  { value: "calligraphy", label: "화려하게", image: calligraphyPreview },
  { value: "simple", label: "간결하게", image: simplePreview },
  { value: "sharp", label: "날렵하게", image: sharpPreview },
];

export const processSteps: ProcessStep[] = [
  {
    title: "이름 입력 및 스타일 선택",
    description:
      "영문 이름을 입력하고 원하는 분위기의 스타일을 고르면 AI가 싸인을 만듭니다.",
  },
  {
    title: "저장 또는 재생성",
    description:
      "완성된 싸인이 마음에 들면 저장하고, 다른 결과가 필요하면 다시 생성할 수 있습니다.",
  },
  {
    title: "연습하기",
    description:
      "저장한 싸인을 따라 쓰며 획의 흐름을 익히고 내 필체로 연습해 보세요.",
  },
];
