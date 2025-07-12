interface Sign {
  id: string;
  url: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
}

interface newSign {
  id: string;
  name: string;
  udpatedAt: string;
}

export interface SignProps {
  sign: Sign;
  onUpdate?: (newSign: newSign) => void;
  onDelete: (updatedId: string, isDeleted: boolean) => void;
}

export interface ToggleSwitchProps {
  label: string;
  checked: boolean;
  onToggle: () => void;
}

export interface EditModalProps {
  name: string;
  signId: string;
  onClose: () => void;
  onSetName: (name: string) => void;
  onEdit: (id: string, name: string) => void;
}

export interface DeleteModalProps {
  name: string;
  onConfirm: () => void;
  onCancel: () => void;
}
