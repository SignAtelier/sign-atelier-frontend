interface Sign {
  id: number;
  url: string;
  createdAt: string;
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
