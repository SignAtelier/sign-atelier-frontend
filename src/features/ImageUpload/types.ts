import { type ChangeEvent } from "react";

export interface ImageUploaderProps {
  file: File | null;
  onFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
