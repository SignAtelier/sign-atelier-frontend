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
  showOutline: boolean;
  signOutlineUrl: string;
  onUpdatePractices: Dispatch<SetStateAction<Practice[]>>;
  width: number;
  height: number;
}

export interface SignBoxProps {
  title: string;
  imageSrc: string;
  showOutline: boolean;
  onToggleOutline: () => void;
  width: number;
  height: number;
}

export interface Point {
  x: number;
  y: number;
}

export interface CanvasProps {
  width: number;
  height: number;
  canvasRef: RefObject<HTMLCanvasElement | null>;
  signOutlineUrl?: string;
}
