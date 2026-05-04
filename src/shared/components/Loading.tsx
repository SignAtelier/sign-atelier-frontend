import Lottie, { type LottieRefCurrentProps } from "lottie-react";
import { useEffect, useRef } from "react";
import signatureAnimation from "../../public/signature.json";
import type { LoadingProps } from "./types.ts";

const Loading = ({ children }: LoadingProps) => {
  const lottieRef = useRef<LottieRefCurrentProps | null>(null);

  useEffect(() => {
    lottieRef.current?.setSpeed(0.8);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/35 p-6 backdrop-blur-sm">
      <div className="flex w-full max-w-md flex-col items-center rounded-md border border-stone-200 bg-[#f8f3ea] px-8 py-10 shadow-2xl">
        <div className="h-[180px] w-[300px] overflow-hidden">
          <Lottie
            animationData={signatureAnimation}
            lottieRef={lottieRef}
            className="-mt-10"
          />
        </div>
        <p className="mt-4 text-xl font-bold tracking-tight text-stone-950">
          {children}
        </p>
        <p className="mt-2 text-sm text-stone-500">
          AI가 획의 흐름을 다듬는 중입니다. 잠시만 기다려 주세요.
        </p>
      </div>
    </div>
  );
};

export default Loading;
