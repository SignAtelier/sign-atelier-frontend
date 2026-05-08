import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { getApiErrorMessage } from "../../apis/error";
import { getPresignedUrl, uploadPractice } from "../../apis/practice";
import Button from "../../shared/components/Button";
import Loader from "../../shared/components/Loader";
import { useToast } from "../../shared/components/ToastProvider";
import Canvas from "./Canvas";
import type { PracticeCanvasProps } from "./types";

const PracticeCanvas = ({
  title,
  practices,
  showOutline,
  showScore,
  onUpdatePractices,
  signOutlineUrl,
  size,
  skeletonCanvasRef,
}: PracticeCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [score, setScore] = useState<number>(0);
  const [hasDrawn, setHasDrawn] = useState(false);
  const { sign_id } = useParams();
  const signId = sign_id;
  const { showToast } = useToast();

  const hasUserStroke = (canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext("2d");

    if (!ctx) return false;

    const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

    for (let i = 0; i < pixels.length; i += 4) {
      const red = pixels[i];
      const green = pixels[i + 1];
      const blue = pixels[i + 2];
      const alpha = pixels[i + 3];

      if (alpha > 0 && red < 250 && green < 250 && blue < 250) return true;
    }

    return false;
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (canvas && ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(255,255,255,0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      setScore(0);
      setHasDrawn(false);
    }
  };

  const handleUpload = () => {
    if (!signId || !canvasRef.current) return;

    if (!hasDrawn || !hasUserStroke(canvasRef.current)) {
      showToast({ type: "info", message: "먼저 싸인을 따라 연습해 주세요." });

      return;
    }

    canvasRef.current.toBlob(async (blob) => {
      if (!blob) return;

      try {
        const file = new File([blob], "practice.png", { type: "png" });
        const practice = await uploadPractice(file, signId);
        const url = await getPresignedUrl([practice.fileName]);

        practice.url = url;
        onUpdatePractices([practice, ...practices]);
        showToast({ type: "success", message: "연습 기록을 저장했습니다." });
      } catch (error: unknown) {
        showToast({ type: "error", message: getApiErrorMessage(error) });
      }
    });

    handleClear();
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-base font-semibold text-gray-700">{title}</p>

      <div
        className="relative border border-gray-400 rounded-xl overflow-hidden flex items-center justify-center bg-white"
        style={{ width: size.width, height: size.height }}
      >
        {signOutlineUrl ? (
          <>
            {showOutline && (
              <img
                src={signOutlineUrl}
                alt="Sign outline"
                className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none opacity-30"
              />
            )}
            <Canvas
              width={size.width}
              height={size.height}
              canvasRef={canvasRef}
              onChangeScore={setScore}
              onDrawChange={setHasDrawn}
              skeletonCanvasRef={skeletonCanvasRef}
            />
            {showScore && (
              <div
                className={`
                  absolute top-3 right-3 px-3 py-1 rounded-md shadow-md text-lg font-semibold bg-white/80 backdrop-blur border border-gray-300 text-gray-800 z-15
                `}
              >
                {Math.round(score * 100)}점
              </div>
            )}
          </>
        ) : (
          <Loader />
        )}
      </div>

      <div className="flex gap-4 w-full h-10">
        <Button onClick={handleClear} style="text-black bg-white border" padding="py-0">
          다시 그리기
        </Button>
        <Button onClick={handleUpload} padding="py-0">
          저장하기
        </Button>
      </div>
    </div>
  );
};

export default PracticeCanvas;
