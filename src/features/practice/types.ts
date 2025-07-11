import type { RefObject } from "react";

export interface PracticeSignListProps {
  signList: { id: number; img: string }[];
  onSelect?: (id: number) => void;
}

export interface DownloadModalProps {
  imgSrc: string;
  onClose: () => void;
}

export interface PracticeCanvasProps {
  title: string;
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
