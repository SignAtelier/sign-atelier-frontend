import type { Dispatch, SetStateAction } from "react";

export interface ImageUploaderProps {
  file: File | null;
  setFile: Dispatch<SetStateAction<File | null>>;
}
