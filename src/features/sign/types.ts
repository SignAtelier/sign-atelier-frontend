interface Sign {
  id: string;
  url: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
}

export interface SignProps {
  sign: Sign;
}

export interface ToggleSwitchProps {
  label: string;
  checked: boolean;
  onToggle: () => void;
}
