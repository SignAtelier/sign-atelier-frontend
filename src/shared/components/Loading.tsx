import Lottie from "lottie-react";
import { useEffect, useRef } from "react";
import signatureAnimation from "../../public/signature.json";
import type { LoadingProps } from "./types.ts";

const Loading = ({ children }: LoadingProps) => {
  const lottieRef = useRef<any>(null);

  useEffect(() => {
    lottieRef.current?.setSpeed(0.8);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
      <div className="flex flex-col items-center">
        <div className="overflow-hidden h-[180px] w-[300px]">
          <Lottie
            animationData={signatureAnimation}
            lottieRef={lottieRef}
            className="-mt-10"
          />
        </div>
        <p className="mt-6 text-xl font-medium text-gray-700 tracking-tight">
          {children}
        </p>
      </div>
    </div>
  );
};

export default Loading;
