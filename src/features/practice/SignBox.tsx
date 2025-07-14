import Loader from "../../shared/components/Loader";
import ToggleSwitch from "./ToggleSwitch";
import type { SignBoxProps } from "./types";

const SignBox = ({
  title,
  imageSrc,
  showImage,
  showOutline,
  onToggleImage,
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
          <>
            {showImage ? (
              <img src={imageSrc} alt="sign" />
            ) : (
              <span className="text-sm text-gray-400">이미지 숨김</span>
            )}
          </>
        ) : (
          <Loader />
        )}
      </div>

      <div className="flex gap-8 h-10">
        <ToggleSwitch
          label="이미지 보기"
          checked={showImage}
          onToggle={onToggleImage}
        />
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
