import Loader from "../../shared/components/Loader";
import ToggleSwitch from "./ToggleSwitch";
import type { SignBoxProps } from "./types";

const SignBox = ({
  title,
  imageSrc,
  showOutline,
  onToggleOutline,
  width,
  height,
}: SignBoxProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-base font-semibold text-gray-700">{title}</p>

      <div
        className={`p-4 border border-gray-400 rounded-xl overflow-hidden flex items-center justify-center bg-white`}
        style={{ width: `${width}px`, height: `${height}px` }}
      >
        {imageSrc ? (
          <img
            src={imageSrc}
            alt="sign"
            className="w-full h-full object-contain"
          />
        ) : (
          <Loader />
        )}
      </div>

      <div className="flex gap-8 h-10">
        <ToggleSwitch
          label="윤곽선 보기"
          checked={showOutline}
          onToggle={onToggleOutline}
        />
      </div>
    </div>
  );
};

export default SignBox;
