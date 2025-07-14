import type { ChangeEventHandler, MouseEventHandler, ReactNode } from "react";

export interface ButtonProps {
  children: ReactNode;
  onClick: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  style?: string;
  padding?: string;
}

export interface InputProps {
  type?: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
}

export interface ModalProps {
  children: ReactNode;
  onClose: () => void;
}

export interface UserMenuProps {
  onCloseMenu: () => void;
}

export interface LoadingProps {
  children: ReactNode;
}

export interface ToastProps {
  text: string;
}

interface Option {
  value: { width: number; height: number };
  label: string;
}

export interface SelectorProps {
  children: ReactNode;
  options: Option[];
  defaultValue: Option;
  onChange?: (option: Option | null) => void;
}
