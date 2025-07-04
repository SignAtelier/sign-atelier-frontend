import Button from "../../shared/components/Button";
import type { PracticeCanvasProps } from "./types";

const PracticeCanvas = ({
  canvasWidth,
  canvasHeight,
  onReset,
  onSave,
}: PracticeCanvasProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-base font-semibold text-gray-700">나의 연습 공간</p>

      <canvas
        width={canvasWidth}
        height={canvasHeight}
        className="border border-gray-400 rounded-xl bg-white shadow-inner"
      />

      <div className="flex gap-4 w-full y-10">
        <Button onClick={onReset} style="text-black bg-white">
          다시 그리기
        </Button>
        <Button onClick={onSave}>저장하기</Button>
      </div>
    </div>
  );
};

export default PracticeCanvas;
