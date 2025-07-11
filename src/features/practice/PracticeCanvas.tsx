import { useRef } from "react";
import Button from "../../shared/components/Button";
import Canvas from "./Canvas";
import type { PracticeCanvasProps } from "./types";

const PracticeCanvas = ({ title }: PracticeCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleClear = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (canvas && ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  const handleUpload = () => {}

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-base font-semibold text-gray-700">{title}</p>

      <div className="p-4 w-[512px] h-[512px] border border-gray-400 rounded-xl overflow-hidden flex items-center justify-center bg-white">
        <Canvas size={512} canvasRef={canvasRef} />
      </div>

      <div className="flex gap-10 w-full h-10">
        <Button onClick={handleClear} style="text-black bg-white">
          다시 그리기
        </Button>
        <Button onClick={handleUpload}>저장하기</Button>
      </div>
    </div>
  );
};

export default PracticeCanvas;
