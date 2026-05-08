export interface LoginModalProps {
  onClose: () => void;
  onSuccess?: () => void;
}

export interface ProfileProps {
  profilePicture: string;
  onToggleMenu: () => void;
}
