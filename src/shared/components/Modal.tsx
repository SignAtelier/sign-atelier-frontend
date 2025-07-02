import { IoCloseOutline } from "react-icons/io5";
import type { ModalProps } from "./types";

const Modal = ({ children, onClose }: ModalProps) => {
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center">
      <div className="absolute inset-0 bg-black opacity-40" />
      <div className="relative py-4 px-6 bg-white rounded-md space-y-4 border z-10">
        <div className="flex justify-end">
          <IoCloseOutline
            className="text-2xl cursor-pointer"
            onClick={onClose}
          />
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
