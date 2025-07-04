interface Sign {
  id: number;
  img: string;
  name: string;
  createdAt: string;
}

export interface SignProps {
  sign: Sign;
}

export interface ToggleSwitchProps {
  label: string;
  checked: boolean;
  onToggle: () => void;
}
