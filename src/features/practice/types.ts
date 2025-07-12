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
  onSelect?: (id: string) => void;
}

export interface DownloadModalProps {
  url: string;
  onClose: () => void;
}

export interface PracticeCanvasProps {
  title: string;
  practices: Practice[];
  setPractices: Dispatch<SetStateAction<Practice[]>>;
}

export interface SignBoxProps {
  title: string;
  imageSrc: string;
  showImage: boolean;
  showOutline: boolean;
  onToggleImage: () => void;
  onToggleOutline: () => void;
}

export interface Point {
  x: number;
  y: number;
}

export interface CanvasProps {
  size: number;
  canvasRef: RefObject<HTMLCanvasElement | null>;
}
