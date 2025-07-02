import type { ReactNode, MouseEventHandler, ChangeEventHandler } from "react";

export interface ButtonProps {
  children: ReactNode;
  onClick: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
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
  onClick: () => void;
  onClose: () => void;
  buttonText?: string;
}
