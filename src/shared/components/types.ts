import type { ChangeEventHandler, MouseEventHandler, ReactNode } from "react";

export interface ButtonProps {
  children: ReactNode;
  onClick: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  style?: string;
}

export interface HeaderProps {
  buttonText: string;
  onButtonClick: () => void;
}

export interface InputProps {
  type?: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  placeholder: string;
}

export interface ModalProps {
  children: ReactNode;
  onClose: () => void;
}
