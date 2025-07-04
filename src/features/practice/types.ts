export interface PracticeSignListProps {
  signList: { id: number; img: string }[];
  onSelect?: (id: number) => void;
}

export interface DownloadModalProps {
  imgSrc: string;
  onClose: () => void;
}

export interface PracticeCanvasProps {
  canvasWidth: number;
  canvasHeight: number;
  onReset: () => void;
  onSave: () => void;
}

export interface SignBoxProps {
  title: string;
  imageSrc: string;
  showImage: boolean;
  showOutline: boolean;
  onToggleImage: () => void;
  onToggleOutline: () => void;
}
