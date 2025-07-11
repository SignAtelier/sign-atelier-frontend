import { useRef } from "react";
import { useParams } from "react-router-dom";
import { uploadPractice } from "../../apis/practice";
import Button from "../../shared/components/Button";
import Canvas from "./Canvas";
import type { PracticeCanvasProps } from "./types";

const PracticeCanvas = ({ title }: PracticeCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { sign_id } = useParams();
  const signId = sign_id;

  const isCanvasBlank = (canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext("2d");

    if (!ctx) return true;

    const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

    for (let i = 0; i < pixels.length; i += 4) {
      const alpha = pixels[i + 3];
      if (alpha !== 0) return false;
    }

    return true;
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (canvas && ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  const handleUpload = () => {
    if (!signId || !canvasRef.current || isCanvasBlank(canvasRef.current))
      return;

    canvasRef.current.toBlob(async (blob) => {
      const file = new File([blob!], "practice.png", { type: "png" });
      const fileName = await uploadPractice(file, signId);
    });

    handleClear();
  };

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
