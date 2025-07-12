import type { Dispatch, RefObject, SetStateAction } from "react";

export interface Practice {
  id: string;
  fileName: string;
  createdAt: string;
  updatedAt: string;
  url: string;
}

export interface Practice {
  id: string;
  fileName: string;
  createdAt: string;
  updatedAt: string;
  url: string;
}

export interface PracticeRecordsProps {
  practices: Practice[];
  onUpdatePractices: Dispatch<SetStateAction<Practice[]>>;
}

export interface DownloadModalProps {
  url: string;
  onClose: () => void;
}

export interface PracticeCanvasProps {
  title: string;
  practices: Practice[];
  onUpdatePractices: Dispatch<SetStateAction<Practice[]>>;
  width: number;
  height: number;
}

export interface SignBoxProps {
  title: string;
  imageSrc: string;
  showImage: boolean;
  showOutline: boolean;
  onToggleImage: () => void;
  onToggleOutline: () => void;
  width: number;
  height: number;
}

export interface Point {
  x: number;
  y: number;
}

export interface CanvasProps {
  canvasRef: RefObject<HTMLCanvasElement | null>;
  width: number;
  height: number;
}
