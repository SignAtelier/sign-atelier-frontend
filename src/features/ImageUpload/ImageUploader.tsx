import type { ChangeEvent } from "react";
import { FaUpload } from "react-icons/fa6";
import type { ImageUploaderProps } from "./types";

const ImageUploader = ({ file, setFile }: ImageUploaderProps) => {
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div className="space-y-4">
      <label htmlFor="file-upload">
        <div className="cursor-pointer border-2 border-[#3a5afe] border-dashed rounded p-10 flex flex-col items-center gap-4 h-64">
          {file ? (
            <img
              src={URL.createObjectURL(file)}
              alt={file.name}
              className="max-w-full max-h-full"
            />
          ) : (
            <>
              <FaUpload size="3em" color="#3a5afe" />
              <span className="text-sm">지원 확장자 : JPG, JPEG, PNG</span>
              <div>원하는 스타일의 싸인을 업로드 해주세요</div>
              <span className="text-[#3a5afe] font-bold">
                드래그 앤 드롭 또는 클릭
              </span>
            </>
          )}
        </div>
      </label>
      <input
        type="file"
        accept=".png, .jpg, .jpeg"
        className="hidden"
        id="file-upload"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default ImageUploader;
