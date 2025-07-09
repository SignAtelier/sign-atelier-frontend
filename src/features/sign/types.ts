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
  onUpdate: (newSign: newSign) => void;
}

export interface ToggleSwitchProps {
  label: string;
  checked: boolean;
  onToggle: () => void;
}
