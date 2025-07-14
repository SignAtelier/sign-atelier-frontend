interface Sign {
  id: string;
  url: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
  deletedAt: string | null;
}

export interface SignProps {
  sign: Sign;
  onUpdateName?: (sign: Sign) => void;
  onRestore?: (sign: Sign) => void;
  onSoftDelete: (sign: Sign) => void;
  onHardDelete?: (deletedId: string) => void;
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
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}
