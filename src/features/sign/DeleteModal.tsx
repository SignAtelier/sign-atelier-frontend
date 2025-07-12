import Button from "../../shared/components/Button";
import Modal from "../../shared/components/Modal";
import type { DeleteModalProps } from "./types";

const DeleteModal = ({
  name,
  message,
  onConfirm,
  onCancel,
}: DeleteModalProps) => {
  return (
    <>
      <Modal onClose={onCancel}>
        <p className="text-md font-bold">{name}</p>
        <p className="text-md text-gray-800 pb-4">{message}</p>
        <div className="flex gap-2 justify-end mt-4">
          <Button onClick={onCancel} style="#white border">
            취소
          </Button>
          <Button onClick={onConfirm} style="bg-red-400 text-white">
            삭제
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default DeleteModal;
